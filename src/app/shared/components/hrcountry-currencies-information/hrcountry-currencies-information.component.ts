import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Currency } from 'src/app/model/currency';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-hrcountry-currencies-information',
  templateUrl: './hrcountry-currencies-information.component.html',
  styleUrls: ['./hrcountry-currencies-information.component.scss']
})
export class HRCountryCurrenciesInformationComponent implements OnInit {
  @Input() currencies: Array<Currency>;
  displayedCurrencies: string[] = ['code', 'name','symbol'];

  @ViewChild(MatPaginator, {static: true}) currenciesPaginator: MatPaginator;   
  @ViewChild(MatSort, {static: true}) currenciesSort: MatSort;

  currenciesDataSource: MatTableDataSource<Currency>;
  constructor() { }

  ngOnInit() {
    this.currenciesDataSource = new MatTableDataSource(this.currencies);
    this.currenciesDataSource.paginator = this.currenciesPaginator;
    this.currenciesDataSource.sort = this.currenciesSort;
  }

}
