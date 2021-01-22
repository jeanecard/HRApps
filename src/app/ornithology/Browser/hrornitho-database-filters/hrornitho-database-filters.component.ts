import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-hrornitho-database-filters',
  templateUrl: './hrornitho-database-filters.component.html',
  styleUrls: ['./hrornitho-database-filters.component.scss']
})
export class HROrnithoDatabaseFiltersComponent implements OnInit {
  seasonForm = new FormControl();
  rangeForm = new FormControl();

  seasons: string[] = ['Spring', 'Summer', 'Autumn', 'Winter'];
  ranges: string[] = ['50 km', '250 km', '1000 km', '2500 km'];

  constructor() { }

  ngOnInit() {
  }

}
