import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HRCountry } from 'src/app/model/hrcountry';
import { Currency } from 'src/app/model/currency';

@Component({
  selector: 'app-flag-detail',
  templateUrl: './flag-detail.component.html',
  styleUrls: ['./flag-detail.component.scss']
})
export class FlagDetailComponent implements OnInit {
  
  languagesDataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) languagesPaginator: MatPaginator;   
  @ViewChild(MatSort, {static: true}) languagesSort: MatSort;
  ngOnInit() {

    this.languagesDataSource = new MatTableDataSource(this.data.languages);
    this.languagesDataSource.paginator = this.languagesPaginator;
    this.languagesDataSource.sort = this.languagesSort;

} 

  translations: HRCountry[];
  constructor(public dialogRef: MatDialogRef<FlagDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HRCountry) { 
      }
    

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
