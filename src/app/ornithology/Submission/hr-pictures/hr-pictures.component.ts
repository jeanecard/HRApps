import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Front juvenile', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'head juvenile', weight: 4.0026, symbol: 'He'},
];
@Component({
  selector: 'app-hr-pictures',
  templateUrl: './hr-pictures.component.html',
  styleUrls: ['./hr-pictures.component.scss']
})
export class HrPicturesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
