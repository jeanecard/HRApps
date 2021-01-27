import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HRPictureOrnitho } from 'src/app/model/Ornitho/hrpicture-ornitho';
import { HRAddPictureDialogComponent } from '../hradd-picture-dialog/hradd-picture-dialog.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: HRPictureOrnitho[] = [
  {id: 'turdus merula', source : 'HR corp', credit : 'Hr', isMale : true, typeAge : 'Juvenile', url : "https://jeanecard.github.io/HRBirdsPicturesDB/turdus%20merula/male_back_small.jpg"},
  {id: 'turdus merula', source : 'HR corp', credit : 'Hr', isMale : true, typeAge : 'Adulte', url : "https://jeanecard.github.io/HRBirdsPicturesDB/Streptopelia%20decaocto/Streptopelia_decaocto_side_small.jpg"},
];
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
  displayedColumns: string[] = ['id', 'typeAge', 'isMale', 'source', 'credit', 'url'];
  birdsPictures :HRPictureOrnitho[];
  dataSource : MatTableDataSource<HRPictureOrnitho>;




  constructor(public dialog: MatDialog) { }
  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.birdsPictures = [];
    this.dataSource = new MatTableDataSource<HRPictureOrnitho>(this.birdsPictures);
  }
 
  
openAddPictureDialog(): void {
  const dialogRef = this.dialog.open(HRAddPictureDialogComponent, {
    width: '600px',
    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    this.birdsPictures.push(result);
    this.dataSource = new MatTableDataSource<HRPictureOrnitho>(this.birdsPictures);
    console.log(this.dataSource);

  });
}

}
