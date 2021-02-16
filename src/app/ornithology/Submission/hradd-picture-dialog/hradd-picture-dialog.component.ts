import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileToUpload, HRPictureOrnithoAddInput } from 'src/app/model/Ornitho/hrpicture-ornitho';
import { HRPicturesSubmissionService } from 'src/app/shared/Ornithology/hrpictures-submission.service';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { HrSubmitSource } from 'src/app/model/Ornitho/hr-submit-source';
import { HrSubmitGender } from 'src/app/model/Ornitho/hr-submit-gender';
import { HrSubmitAge } from 'src/app/model/Ornitho/hr-submit-age';


const UNASSIGNED_VALUE_DISPLAY = " _ ";
const MORE_INFO_DISPLAY = " ...";
@Component({
  selector: 'app-hradd-picture-dialog',
  templateUrl: './hradd-picture-dialog.component.html',
  styleUrls: ['./hradd-picture-dialog.component.scss']
})
export class HRAddPictureDialogComponent implements OnInit {

  private _model: HRPictureOrnithoAddInput;
  public dataPickerFormGroup: FormGroup;
  public ageType: FormControl;
  public gender: FormControl;
  public credit: FormControl;
  public source: FormControl;
  public comment: FormControl;
  public imagePickerFormGroup: FormGroup;
  public sources: Observable<HrSubmitSource[]>;
  public genders: Observable<HrSubmitGender[]>;
  public ageTypes: Observable<HrSubmitAge[]>;
  url: string | ArrayBuffer;
  cardImageBase64: string;
  imageError: string;
  isUploadingState = false;
  uploadStatus = "saucisse";

  isLinear = false;

  theFile: any = null;
  messages: string[] = [];


  constructor(
    public dialogRef: MatDialogRef<HRAddPictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HRPictureOrnithoAddInput,
    private _picService: HRPicturesSubmissionService
  ) { }

  ngOnInit(): void {

    // TODO HR charge l'objet en cas d'update ici
    this._model = new HRPictureOrnithoAddInput();
    this.ageType = new FormControl(this.data?.ageType);
    this.gender = new FormControl(this.data?.genderType);
    this.credit = new FormControl(this.data?.credit);
    this.source = new FormControl(this.data?.sourceType);
    this.comment = new FormControl(this.data?.comment);
    this.dataPickerFormGroup = new FormGroup({
      ageType: this.ageType,
      gender: this.gender,
      credit: this.credit,
      source: this.source,
      comment: this.comment
    });
    this.imagePickerFormGroup = new FormGroup({});
    this.sources = this._picService.getSources(); // pense a unrelease
    this.genders = this._picService.getGenders();
    this.ageTypes = this._picService.getAges();
  }

  public onYesClick(): void {
    this.updateModelFromView();
    if (this.data?.id) {
      this._picService.updateImage(this._model).subscribe({
        next:
          data => {
            this.dialogRef.close(data);
          },
        error: (dataError) => {
          console.log(dataError);
        },
        complete: () => {

        }
      });
    } else {
      this._picService.addImageData(this._model).subscribe({
        next:
          data => { 
            this.dialogRef.close(data);
          },
        error: (dataError) => {
          console.log(dataError);
        },
        complete: () => {
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private updateModelFromView(): void {
    this._model.credit = this.credit.value;
    this._model.id = this.data.id;
    this._model.vernacularName = this.data?.vernacularName;
    this._model.genderType = this.gender.value?.id;
    this._model.sourceType = this.source.value?.id;
    this._model.ageType = this.ageType.value?.id;
  }
  // CODE DROP
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }



  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }

    const reader = new FileReader();
    let img = new Image();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }






  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }


      this.theFile = fileInput.target.files[0];
      this.readAndUploadFile(this.theFile);

      // a priori dummy
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.files.push(fileInput.target.files[0]);
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }


  private readAndUploadFile(theFile: any) {
    let file = new FileToUpload();

    // Set File Information
    file.fileName = theFile.name;
    file.fileSize = theFile.size;
    file.fileType = theFile.type;
    file.lastModifiedTime = theFile.lastModified;
    file.lastModifiedDate = theFile.lastModifiedDate;
    file.submittedPicture = new HRPictureOrnithoAddInput();
    file.submittedPicture.ageType = this.ageType.value?.id;
    file.submittedPicture.genderType = this.gender.value?.id;
    file.submittedPicture.sourceType = this.source.value?.id;
    file.submittedPicture.vernacularName = this.data?.vernacularName;
    file.submittedPicture.credit = this.credit.value;

 

    // Use FileReader() object to get file to upload
    // NOTE: FileReader only works with newer browsers
    let reader = new FileReader();

    // Setup onload event for reader
    reader.onload = () => {
      // Store base64 encoded representation of file
      file.fileAsBase64 = reader.result.toString();

      // POST to server
      this._picService.uploadFile(file).subscribe(resp => {
        this.messages.push("Upload complete");
      });
    }

    // Read the file
    reader.readAsDataURL(theFile);
  }

  public getReducedText(value: string): string {
    if (value && value.length > 50) {
      return value.substring(0, 50) + MORE_INFO_DISPLAY;
    }
    return value;
  }
  public getGenderSumupDisplay(): string {
    if (this.gender?.value?.submitGender) {
      return this.gender?.value?.submitGender;
    } else {
      return UNASSIGNED_VALUE_DISPLAY;
    }

  }
  public getAgeSumupDisplay(): string {
    if (this.ageType?.value?.age) {
      return this.ageType?.value?.age;
    } else {
      return UNASSIGNED_VALUE_DISPLAY;
    }
  }

}
