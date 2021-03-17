import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileToUpload, HRPictureOrnithoAddOrUpdateInput } from 'src/app/model/Ornitho/hrpicture-ornitho';
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

  private _model: HRPictureOrnithoAddOrUpdateInput;
  public dataPickerFormGroup: FormGroup;
  public ageType: FormControl;
  public gender: FormControl;
  public credit: FormControl;
  public source: FormControl;
  public comment: FormControl;
  public imagePickerFormGroup: FormGroup;
  public sources: HrSubmitSource[];
  public genders: HrSubmitGender[];
  public ageTypes: HrSubmitAge[];
  public files: any[] = [];
  private MAX_SIZE = 20971520;
  private ALLOWED_TYPES = ['image/png', 'image/jpeg'];
  cardImageBase64: string;
  imageError: string;
  isUploadingState = false;
  uploadStatus = "saucisse";
  isLinear = false;
  messages: string[] = [];


  constructor(
    public dialogRef: MatDialogRef<HRAddPictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HRPictureOrnithoAddOrUpdateInput,
    private _picService: HRPicturesSubmissionService
  ) { 
  }

  ngOnInit(): void {

    // TODO HR charge l'objet en cas d'update ici
    this._model = new HRPictureOrnithoAddOrUpdateInput();
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
    this._picService.getSources().subscribe({
      next:
        data => {
          this.sources = data;
          for(let iter of data){
            if(iter.id === this.data.sourceType){
              this.source.setValue(iter);
              break;
            }
          }
        },
      error: (dataError) => {
        // Dummy
      },
      complete: () => {
        // Dummy
      }
    });
    this._picService.getGenders().subscribe({
      next:
        data => {
          this.genders = data;
          for(let iter of data){
            if(iter.id === this.data.genderType){
              this.gender.setValue(iter);
              break;
            }
          }
        },
      error: (dataError) => {
        // Dummy
      },
      complete: () => {
        // Dummy
      }
    });
    this._picService.getAges().subscribe({
      next:
        data => {
          this.ageTypes = data;
          for(let iter of data){
            if(iter.id === this.data.ageType){
              this.ageType.setValue(iter);
              break;
            }
          }
        },
 
      error: (dataError) => {
        // Dummy
      },
      complete: () => {
        // Dummy
      }
    });
  }

  /**
  *  Save data :
  * 1- Update model from view
  * 2- Get service Observable for metadata update or creation
  * 3- Upload metadata
  * 4- Upload file
  */
  public onYesClick(): void {
    //1- 
    this.updateModelFromView();
    //2- 
    let observable: Observable<any>;
    if (this.data?.id) {
      observable = this._picService.updateImage(this._model);
    } else {
      observable = this._picService.addImageData(this._model);
    }
    //3- 
    observable.subscribe({
      next:
        imageData => {
          //4- 
          let fileForService = this.createFileToUploadFromSelectedFile(imageData);
          
          if (fileForService) {
            this._picService.uploadFile(fileForService).subscribe(
              { 
                next :uploadResponse => {
              this.messages.push("Upload complete");
              this.dialogRef.close(imageData);
            },      
            error: (dataError) => {
              console.log("Error on_picService.uploadFile ");
              console.log(dataError);
              // TODO Error display
            },
            complete: () => {
              // Dummy
            }
          });
          } else{
            // no update strategy on image in this very first version.
            this.dialogRef.close(imageData);
          }         
        },
      error: (dataError) => {
        // Dummy
      },
      complete: () => {
        // Dummy
      }
    });
  }

  /**
  * Close dialog.
  */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
*  update this._model from view data
*/
  private updateModelFromView(): void {
    this._model.credit = this.credit.value;
    this._model.id = this.data.id;
    this._model.vernacularName = this.data?.vernacularName;
    this._model.genderType = this.gender.value?.id;
    this._model.sourceType = this.source.value?.id;
    this._model.ageType = this.ageType.value?.id;
    this._model.comment = this.comment.value;
    this._model.fullImageUrl = this.data.fullImageUrl;
    this._model.thumbnailUrl = this.data.thumbnailUrl;

  }

  /**
   * on file dropped handler
   */
  public onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  public deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Convert Files list to normal array list of a single item.
   * @param files (Files List)
   */
  prepareFilesList(inputfiles: Array<any>) {
    // 1- Clear existing file list.
    this.files = [];
    for (const item of inputfiles) {
      item.progress = 0;
      this.files.push(item);
      // 2- Push only first file selected.
      break;
    }
  }

  /**
   * format bytes for displaying in view.
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  public formatBytesForView(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  /**
 * Triggered when file(s) are selected
 * 1- If files is not empty list
 *  1.1- If size and type of the first file is valid
 *    1.1.1- Create FileReader and define onLoad trigger
 *    1.1.2- Launch file loading
 * 2- else, dummy
 * @param filesInput array of selected files
 */
  public fileChangeEvent(filesInput: any) {
    // 1-
    if (filesInput?.target?.files
      && filesInput.target.files[0]) {
      let firstFile = filesInput.target.files[0];
      // 1.1-
      if (!this.isErrorWhileCheckingTypeAndSize(filesInput)) {
        // 1.1.1-
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.files.push(firstFile);
          };
        };
        // 1.1.2-
        reader.readAsDataURL(filesInput.target.files[0]);
      }
    }
  }

  /**
   * check if file is jpeg or png and size < MAX_SIZE.
   * if not, set imageError property value.
   * @param a file array
   */
  private isErrorWhileCheckingTypeAndSize(filesInput: any): boolean {
    if (filesInput?.target?.files
      && filesInput.target.files[0]) {
      if (filesInput.target.files[0].size > this.MAX_SIZE) {
        this.imageError =
          'Maximum size allowed is ' + this.MAX_SIZE / 1000 + 'Mb';
        return true;
      }

      if (!_.includes(this.ALLOWED_TYPES, filesInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return true;
      }
      return false;
    }
    return false;
  }
  /**
   * Prepare data for service from uploaded file.
   * 
   */
  private createFileToUploadFromSelectedFile(element : HRPictureOrnithoAddOrUpdateInput): FileToUpload {
    if (this.files && this.files[0]) {
      let selectedFile = this.files[0];
      let fileForService = new FileToUpload();
      // Set File Information
      fileForService.fileName = selectedFile.name;
      fileForService.fileSize = selectedFile.size;
      fileForService.fileType = selectedFile.type;
      fileForService.lastModifiedTime = selectedFile.lastModified;
      fileForService.lastModifiedDate = selectedFile.lastModifiedDate;
      fileForService.submittedPicture = new HRPictureOrnithoAddOrUpdateInput();
      fileForService.submittedPicture.ageType = this.ageType.value?.id;
      fileForService.submittedPicture.genderType = this.gender.value?.id;
      fileForService.submittedPicture.sourceType = this.source.value?.id;
      fileForService.submittedPicture.vernacularName = element.vernacularName;
      fileForService.submittedPicture.credit = this.credit.value;
      fileForService.submittedPicture.thumbnailUrl = element.thumbnailUrl;
      fileForService.fileAsBase64 = this.cardImageBase64;
      fileForService.submittedPicture.id = element.id;
      fileForService.submittedPicture.comment = element.comment;
      return fileForService;
    }
    return null;
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
