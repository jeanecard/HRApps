import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PopulationFilterModel } from 'src/app/model/population-filter-model';
import { FormControl } from '@angular/forms';
import { MatSlideToggleChange, MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-population-filter',
  templateUrl: './population-filter.component.html',
  styleUrls: ['./population-filter.component.scss']
})
export class PopulationFilterComponent implements OnInit {

  @Output() populationChanged = new EventEmitter<PopulationFilterModel>();
  population: PopulationFilterModel = new PopulationFilterModel();
  public amountCtrl = new FormControl();
  public overCtrl = new FormControl();

  public populationsFilter = [
    { value: 0, name: 'No filter' },
    { value: 100000, name: '100 000' },
    { value: 1000000, name: '1 Million' },
    { value: 5000000, name: '5 Millions' },
    { value: 20000000, name: '20 Millions' },
    { value: 100000000, name: '100 Millions' },
    { value: 500000000, name: '500 Millions' },
    { value: 1000000000, name: '1 Billion' }
  ];

  constructor() { }

  ngOnInit() {
  }
  onSelection(populationEvent: MatSelectChange) {
    const populationValue = populationEvent.value;
    this.population.amount = populationValue;
    this.populationChanged.emit(this.population);
  }
  onToggle(populationEvent: MatSlideToggleChange) {
    if (this.population
      && typeof this.population.amount !== 'undefined'
      && this.population.amount.toString() !== '0') { // TODO voir pourquoi les valeurs sont convertteis en String dans FormControl.
      const toggleValue = populationEvent.checked;
      this.population.over = toggleValue;
      this.populationChanged.emit(this.population);
    }
  }
}
