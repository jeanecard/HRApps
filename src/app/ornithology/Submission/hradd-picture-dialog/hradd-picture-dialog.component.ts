import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HRPictureOrnitho } from 'src/app/model/Ornitho/hrpicture-ornitho';

@Component({
  selector: 'app-hradd-picture-dialog',
  templateUrl: './hradd-picture-dialog.component.html',
  styleUrls: ['./hradd-picture-dialog.component.scss']
})
export class HRAddPictureDialogComponent implements OnInit {

  public ornithoPictureDialog: FormGroup;
  public ageType: FormControl;
  public gender: FormControl;
  public credit: FormControl;
  public source: FormControl;
  fr: FileReader;
  fileToUpload: File = null;
  message: string;
  url: string | ArrayBuffer;

  constructor(public dialogRef: MatDialogRef<HRAddPictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HRPictureOrnitho) { }

  ngOnInit(): void {
    this.ageType = new FormControl();
    this.gender = new FormControl();
    this.credit = new FormControl();
    this.source = new FormControl();
    this.ornithoPictureDialog = new FormGroup({
      ageType: this.ageType,
      gender: this.gender,
      credit: this.credit,
      source : this.source
    });
    this.data = new HRPictureOrnitho();

  }

  public onYesClick():void{
    this.data.credit = this.credit.value;
    this.data.id = "turdus merula passe en input";
    this.data.isMale = this.gender.value;
    this.data.typeAge = this.ageType.value;
    this.data.source = this.source.value;
    this.dialogRef.close(this.data);
  }
  // public handleFileInput(files: FileList): void {
  //   this.fileToUpload = files.item(0);

  //   if (files.length === 0)
  //     return;

  //   const mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = "Only images are supported.";
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = (_event) => {
  //     this.url = reader.result;
  //     this.data.url = reader.result;
  //     console.log("Saucisse");
  //     console.log(this.data.url);
  //   }
  // }
  onNoClick(): void {
    this.dialogRef.close();
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
