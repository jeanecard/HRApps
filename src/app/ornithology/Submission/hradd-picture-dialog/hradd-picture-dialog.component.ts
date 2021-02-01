import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HRPictureOrnitho, HRPictureOrnithoDialog } from 'src/app/model/Ornitho/hrpicture-ornitho';
import { HRPicturesSubmissionService } from 'src/app/shared/Ornithology/hrpictures-submission.service';

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

  constructor(
    public dialogRef: MatDialogRef<HRAddPictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HRPictureOrnithoDialog,
    private _picService: HRPicturesSubmissionService) { }

  ngOnInit(): void {
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
    if (this.data?.isCreationMode) {
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
    } else {
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
    this._model.url = this.url;
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
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
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
    this.uploadFilesSimulator(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.data.url = reader.result;
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


}
