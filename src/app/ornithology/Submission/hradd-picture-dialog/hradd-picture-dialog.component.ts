import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileToUpload, HRPictureOrnitho } from 'src/app/model/Ornitho/hrpicture-ornitho';
import { HRPicturesSubmissionService } from 'src/app/shared/Ornithology/hrpictures-submission.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-hradd-picture-dialog',
  templateUrl: './hradd-picture-dialog.component.html',
  styleUrls: ['./hradd-picture-dialog.component.scss']
})
export class HRAddPictureDialogComponent implements OnInit {

  private _model: HRPictureOrnitho;
  public ornithoPictureDialog: FormGroup;
  public ageType: FormControl;
  public gender: FormControl;
  public credit: FormControl;
  public source: FormControl;
  fr: FileReader;
  fileToUpload: File = null;
  message: string;
  url: string | ArrayBuffer;
  cardImageBase64: string;
  imageError: string;
  isUploadingState = false;
  uploadStatus = "saucisse";

  isLinear = false;
  dataPickerFormGroup: FormGroup;
  imagePickerFormGroup: FormGroup;

  theFile: any = null;
  messages: string[] = [];


  constructor(
    public dialogRef: MatDialogRef<HRAddPictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HRPictureOrnitho,
    private _picService: HRPicturesSubmissionService,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.dataPickerFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.imagePickerFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    // TODO HR charge l'objet en cas d'update ici
    this._model = new HRPictureOrnitho();
    this.ageType = new FormControl(this.data?.typeAge);
    this.gender = new FormControl(this.data?.isMale);
    this.credit = new FormControl(this.data?.credit);
    this.source = new FormControl(this.data?.source);
    this.ornithoPictureDialog = new FormGroup({
      ageType: this.ageType,
      gender: this.gender,
      credit: this.credit,
      source: this.source
    });
    
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
      this._picService.addImage(this._model).subscribe({
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
    this._model.vernacularName = this.data.vernacularName;
    this._model.isMale = this.gender.value;
    this._model.source = this.source.value;
    this._model.typeAge = this.ageType.value;
    this._model.url = this.data.url;
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
      this.data.url = files[0];
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
                    this.data.url = imgBase64Path;
                    //this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
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
  
  // Use FileReader() object to get file to upload
  // NOTE: FileReader only works with newer browsers
  let reader = new FileReader();
  
  // Setup onload event for reader
  reader.onload = () => {
      // Store base64 encoded representation of file
      file.fileAsBase64 = reader.result.toString();
      
      // POST to server
      this._picService.uploadFile(file).subscribe(resp => { 
          this.messages.push("Upload complete"); });
  }
  
  // Read the file
  reader.readAsDataURL(theFile);
}

}
