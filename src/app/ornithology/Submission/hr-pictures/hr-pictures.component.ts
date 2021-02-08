import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HRPictureOrnitho } from 'src/app/model/Ornitho/hrpicture-ornitho';
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

  private _model : string;
  public displayedColumns: string[] = ['url','typeAge', 'gender', 'source', 'credit',  'update', 'delete'];
  private birdsPictures: HRPictureOrnitho[];
  public dataSource: MatTableDataSource<HRPictureOrnitho>;
  public isButtonDisabled: boolean;
  private _propagateChange = (_: any) => { };
  private _propagateTouch = (_: any) => { };


  constructor(public dialog: MatDialog, private _picService : HRPicturesSubmissionService) { }

  writeValue(vernacularName: string): void {
    // dispose
    this._model = vernacularName;
    if (vernacularName) {
      this._picService.getImages(vernacularName).subscribe({
        next:
          data => {
            this.birdsPictures = data;
            this.dataSource = new MatTableDataSource<HRPictureOrnitho>(this.birdsPictures);            
          },
        error: (dataError) => {
          console.log(dataError);
          this.birdsPictures = [];          
          this.dataSource = new MatTableDataSource<HRPictureOrnitho>(this.birdsPictures);            
        },
        complete: () => {}
      });
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
    this.dataSource = new MatTableDataSource<HRPictureOrnitho>(this.birdsPictures);
  }

  openAddPictureDialog(): void {

    const dialogRef = this.dialog.open(HRAddPictureDialogComponent, {
      width: '600px',
      data: { vernacularName: this._model, isCreationMode: true  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._picService.getImages(this._model).subscribe({
          next:
            data => {
              this.birdsPictures = data;
              this.dataSource = new MatTableDataSource<HRPictureOrnitho>(this.birdsPictures);    
            },
          error: (dataError) => {
            console.log(dataError);
          },
          complete: () => {}
        });
      } else{
        this.dataSource = new MatTableDataSource<HRPictureOrnitho>([]);
      }
    });
  }

  public deletePictureDialog(bird : HRPictureOrnitho): void {
    const dialogRef = this.dialog.open(HRConfirmDeletionComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("Suprression !!!");
      }else{
        console.log("Suprression annulée");

      }

    });
  }

  public openUpdatePictureDialog(bird : HRPictureOrnitho): void {

    const dialogRef = this.dialog.open(HRAddPictureDialogComponent, {
      width: '600px',
      data: bird
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._picService.getImages(this._model).subscribe({
          next:
            data => {
              this.birdsPictures = data;
              this.dataSource = new MatTableDataSource<HRPictureOrnitho>(this.birdsPictures);    
            },
          error: (dataError) => {
            console.log(dataError);
          },
          complete: () => {}
        });
      } else{
        this.dataSource = new MatTableDataSource<HRPictureOrnitho>([]);
      }
    });
  }
}
