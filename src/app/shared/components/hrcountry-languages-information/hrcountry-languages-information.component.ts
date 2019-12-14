import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Language } from 'src/app/model/language';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-hrcountry-languages-information',
  templateUrl: './hrcountry-languages-information.component.html',
  styleUrls: ['./hrcountry-languages-information.component.scss']
})
export class HRCountryLanguagesInformationComponent implements OnInit {

  @Input() languages: Array<Language>;
  displayedLangColumns: string[] = ['iso code', 'name', 'native name'];

  @ViewChild(MatPaginator, {static: true}) languagesPaginator: MatPaginator;   
  @ViewChild(MatSort, {static: true}) languagesSort: MatSort;
  languagesDataSource: MatTableDataSource<Language>;


  constructor() { }

  ngOnInit() {
    this.languagesDataSource = new MatTableDataSource(this.languages);
    this.languagesDataSource.paginator = this.languagesPaginator;
    this.languagesDataSource.sort = this.languagesSort;

  }

}
