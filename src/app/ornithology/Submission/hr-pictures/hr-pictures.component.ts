import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HRPictureOrnithoListItem } from 'src/app/model/Ornitho/hrpicture-ornitho';
import { HRConfirmDeletionComponent } from 'src/app/shared/components/hrconfirm-deletion/hrconfirm-deletion.component';
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
export class HrPicturesComponent implements OnInit, ControlValueAccessor {

  private _model: string;
  public displayedColumns: string[] = ['url', 'ageType', 'gender', 'source', 'credit', 'update', 'delete'];
  private birdsPictures: HRPictureOrnithoListItem[];
  public dataSource: MatTableDataSource<HRPictureOrnithoListItem>;
  public isButtonDisabled: boolean;
  private _propagateChange = (_: any) => { };
  private _propagateTouch = (_: any) => { };
  public isLoading = false;


  constructor(public dialog: MatDialog, private _picService: HRPicturesSubmissionService) { }

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

  ngOnInit(): void {
    this.birdsPictures = [];
    this.dataSource = new MatTableDataSource<HRPictureOrnithoListItem>(this.birdsPictures);
  }

  openAddPictureDialog(): void {

    const dialogRef = this.dialog.open(HRAddPictureDialogComponent, {
      width: '600px',
      data: { 
        vernacularName: this._model,
       isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.RefreshImages();
      } else {
        this.dataSource = new MatTableDataSource<HRPictureOrnithoListItem>([]);
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
