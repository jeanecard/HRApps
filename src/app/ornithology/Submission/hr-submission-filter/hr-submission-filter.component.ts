import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  language: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'turdus merula', language: 'Français', symbol: 'H'},
  {position: 2, name: 'pica', language: 'English', symbol: 'H'},
  {position: 3, name: 'turdus merula', language: 'Occitan', symbol: 'H'},
  {position: 4, name: 'turdus merula', language: 'Français', symbol: 'H'},
  
];
@Component({
  selector: 'app-hr-submission-filter',
  templateUrl: './hr-submission-filter.component.html',
  styleUrls: ['./hr-submission-filter.component.scss']
})
export class HrSubmissionFilterComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'language'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
