import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HrThumbnailSubscriber } from 'src/app/model/Ornitho/hr-thumbnail-subscriber';
import { HRPictureOrnithoListItem } from 'src/app/model/Ornitho/hrpicture-ornitho';
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
  public displayedColumns: string[] = ['url', 'ageType', 'gender', 'source', 'credit', 'update', 'delete'];
  private birdsPictures: HRPictureOrnithoListItem[];
  public dataSource: MatTableDataSource<HRPictureOrnithoListItem>;
  public isButtonDisabled: boolean;
  private _propagateChange = (_: any) => { };
  private _propagateTouch = (_: any) => { };
  public isLoading = false;


  constructor(
    public dialog: MatDialog, 
    private _picService: HRPicturesSubmissionService,
    private _picNotifierService: HrPictureSubmissionNotificationService) { }

  
  


  writeValue(vernacularName: string): void {
    // dispose
    this._model = vernacularName;
    if (vernacularName) {
      this.RefreshImages();
    } else {
      this.birdsPictures = [];
    }
  }
  registerOnChange(fn: any): void {
    this._propagateChange(fn);
  }
  registerOnTouched(fn: any): void {
    this._propagateTouch(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isButtonDisabled = isDisabled;
  }

  public ngOnInit(): void {
    this.birdsPictures = [];
    this.dataSource = new MatTableDataSource<HRPictureOrnithoListItem>(this.birdsPictures);
    this._picNotifierService.registerToThumbnailEvent(this);
  }

  public ngOnDestroy(): void {
    this._picNotifierService.unRegisterFromThumbnailEvent(this);
  }

  public onThumbnailCreated(vernacularName: string, id: string, url: string): void {
    if(this._model === vernacularName){
      console.log("yes notification updte thumbnail recu !");
      this.birdsPictures.forEach(element => {
        if(element.id === id){
        console.log("url mise à jour ");
        console.log(url);
          element.thumbnailUrl = url;
          return;
        }
      });
    }else {
    console.log("Notif update Thumbnail recu mais ca n'est pas pour moi");
    }
  }

  public onImageCreated(vernacularName: string, id: string, url: string): void {
    //1 check if same vernacular name
    if(this._model === vernacularName){
      this._picService.getImage(id).subscribe({
        next:
          data => {
            if(!this.birdsPictures){
              this.birdsPictures = [];
            }
            console.log("Notif onImageCreated element ajouté");
            this.birdsPictures.push(data);
            this.dataSource = new MatTableDataSource<HRPictureOrnithoListItem>(this.birdsPictures);
          },
        error: (dataError) => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }else {
    console.log("Notif onImageCreated recu mais ca n'est pas pour moi");
    }
  }

  onConnectionDone(data: string) {
    console.log(data);
  }
  

  public openAddPictureDialog(): void {

    const dialogRef = this.dialog.open(HRAddPictureDialogComponent, {
      width: '600px',
      data: { 
        vernacularName: this._model,
       isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("traitement du close depuis piccomp");

      if (result) {
        // this.RefreshImages();
      } 
    });
  }

  public deletePictureDialog(bird: HRPictureOrnithoListItem): void {
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

  public openUpdatePictureDialog(bird: HRPictureOrnithoListItem): void {

    bird.isNew = false;
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
    this.dataSource = new MatTableDataSource<HRPictureOrnithoListItem>([]);
    this.isLoading = true;
    this._picService.getImages(this._model).subscribe({
      next:
        data => {
          this.isLoading = false;
          this.birdsPictures = data;
          this.dataSource = new MatTableDataSource<HRPictureOrnithoListItem>(this.birdsPictures);
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
