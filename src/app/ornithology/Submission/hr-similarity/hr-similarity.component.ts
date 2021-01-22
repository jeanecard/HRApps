import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [

];
@Component({
  selector: 'app-hr-similarity',
  templateUrl: './hr-similarity.component.html',
  styleUrls: ['./hr-similarity.component.scss']
})
export class HrSimilarityComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  myControl = new FormControl();
  options: string[] = ['Turdus merula', 'chtong chtong', 'raoul'];
  constructor() { }

  ngOnInit(): void {
  }

}
