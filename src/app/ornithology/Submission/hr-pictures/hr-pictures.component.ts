import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { HrThumbnailSubscriber } from 'src/app/model/Ornitho/hr-thumbnail-subscriber';
import { HRPictureOrnithoAddOrUpdateInput } from 'src/app/model/Ornitho/hrpicture-ornitho';
import { HRSubmitPictureModel } from 'src/app/model/Ornitho/hrsubmit-picture-model';
import { HRConfirmDeletionComponent } from 'src/app/shared/components/hrconfirm-deletion/hrconfirm-deletion.component';
import { HrPictureSubmissionNotificationService } from 'src/app/shared/Ornithology/hr-picture-submission-notification.service';
import { HRPicturesSubmissionService } from 'src/app/shared/Ornithology/hrpictures-submission.service';
import { HRAddPictureDialogComponent } from '../hradd-picture-dialog/hradd-picture-dialog.component';

@Component({
  selector: 'app-hr-pictures',
  templateUrl: './hr-pictures.component.html',
  styleUrls: ['./hr-pictures.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HrPicturesComponent),
      multi: true
    }]
})
export class HrPicturesComponent implements OnInit, OnDestroy, ControlValueAccessor, HrThumbnailSubscriber {

  private _model: string;
  public displayedColumns: string[] = ['url', 'ageType', 'gender', 'source', 'credit', 'delete'];

  private birdsPictures: HRSubmitPictureModel[];
  public dataSource: MatTableDataSource<HRSubmitPictureModel>;
  public isButtonDisabled: boolean;
  private _propagateChange = (_: any) => { };
  private _propagateTouch = (_: any) => { };
  public isLoading = false;


  constructor(
    public dialog: MatDialog,
    private _picService: HRPicturesSubmissionService,
    private _picNotifierService: HrPictureSubmissionNotificationService,
    private _snackBar: MatSnackBar) { }



  onInternalImageCreated(data: HRSubmitPictureModel) {
    if (data) {
      let found = false;
      if (!this.birdsPictures) {
        this.birdsPictures = [];
      }
      let picturesCount = this.birdsPictures.length;
      for (let i = 0; i < picturesCount; i++) {
        if (this.birdsPictures[i].id === data.id) {
          found = true;
          break;
        }
      }
      if (!found) {
        this.birdsPictures.push(data);
        //5- refresh datasource to update display
        this.dataSource = new MatTableDataSource<HRSubmitPictureModel>(this.birdsPictures);
        //6- Notify on scrren that a new element has been added.
        this._snackBar.open("New image added.", "", { duration: 2500 });
      }

    }
  }

  public writeValue(vernacularName: string): void {
    // dispose
    this._model = vernacularName;
    if (vernacularName) {
      this.RefreshImages();
    } else {
      this.birdsPictures = [];
    }
  }
  public registerOnChange(fn: any): void {
    this._propagateChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this._propagateTouch = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.isButtonDisabled = isDisabled;
  }

  public ngOnInit(): void {
    this.birdsPictures = [];
    this.dataSource = new MatTableDataSource<HRSubmitPictureModel>(this.birdsPictures);
    this._picNotifierService.registerToThumbnailEvent(this);
  }

  public ngOnDestroy(): void {
    this._picNotifierService.unRegisterFromThumbnailEvent(this);
  }
  /**
  *  onThumbnailCreated :
  * 1- Check if display is concerned
  * 2- Look for input in displayed pictures and update thumbnail url if found
  * 3- Element not found in displayed items so add it in display
  */
  public onThumbnailCreated(jsonRawObject: string): void {
    if (jsonRawObject) {
      let found = false;
      let jsonObject: HRSubmitPictureModel = JSON.parse(jsonRawObject);
      //1- 
      if (this._model === jsonObject.vernacularName) {
        //2-
        let picturesCount = this.birdsPictures.length;
        for (let i = 0; i < picturesCount; i++) {
          if (this.birdsPictures[i].id === jsonObject.id) {
            this._snackBar.open("Thumbnail updated.", "", { duration: 2500 });
            this.birdsPictures[i].thumbnailUrl = jsonObject.thumbnailUrl;
            found = true;
            break;
          }
        }
        if (!found) {
          //3- 
          this.addElementInDisplay(jsonObject);
        }
      }
    }
  }
  /**
  *  onImageCreated :
  * 1- Check if display is concerned
  * 2- Check if this data is not already in displayed elements, return if so.
  * 3- If element does not exit, add it in displayed elements.
  */
  public onImageCreated(jsonRawObject: string): void {
    if (jsonRawObject) {
      let found = false;
      let jsonObject: HRSubmitPictureModel = JSON.parse(jsonRawObject);
      //1-
      if (this._model === jsonObject.vernacularName) {
        //2- 
        let picturesCount = this.birdsPictures.length;
        for (let i = 0; i < picturesCount; i++) {
          if (this.birdsPictures[i].id === jsonObject.id) {
            found = true;
            break;
          }
        }
        if (!found) {
          //3-
          this.addElementInDisplay(jsonObject);
        }
      }
    }
  }

  public onConnectionDone(data: string) {
    console.log(data);
  }

  private addElementInDisplay(data: HRSubmitPictureModel): void {
    if (data) {
      if (!this.birdsPictures) {
        this.birdsPictures = [];
      }
      this.birdsPictures.push(data);
      //1- refresh datasource to update display
      this.dataSource = new MatTableDataSource<HRSubmitPictureModel>(this.birdsPictures);
      //2- Notify on scrren that a new element has been added.
      this._snackBar.open("New image added.", "", { duration: 2500 });
    }
  }

  public deletePictureDialog(bird: HRSubmitPictureModel): void {
    const dialogRef = this.dialog.open(HRConfirmDeletionComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this._picService.deleteImage(bird.id).subscribe({
          next:
            data => {
              this.RefreshImages();
            },
          error: (dataError) => {
            console.log(dataError);
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      }
    });
  }

  public openUpdatePictureDialog(bird: HRSubmitPictureModel): void {

    // bird.isNew = false;
    const dialogRef = this.dialog.open(HRAddPictureDialogComponent, {
      width: '600px',
      data: bird
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.RefreshImages();
      }
    });
  }

  private RefreshImages(): void {
    this.dataSource = new MatTableDataSource<HRSubmitPictureModel>([]);
    this.isLoading = true;
    this._picService.getImages(this._model).subscribe({
      next:
        data => {
          this.isLoading = false;
          this.birdsPictures = data;
          this.dataSource = new MatTableDataSource<HRSubmitPictureModel>(this.birdsPictures);
        },
      error: (dataError) => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
