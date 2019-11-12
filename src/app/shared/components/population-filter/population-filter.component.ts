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



  constructor() { }

  ngOnInit() {
  }

  onSelection(populationEvent: MatSelectChange) {
    console.log('Selection changee pour composant Population (ddl) : ' + populationEvent.value);
    const populationValue = populationEvent.value;
    this.population.amount = populationValue;
    this.populationChanged.emit(this.population);
  }
  onToggle(populationEvent: MatSlideToggleChange) {
    console.log('Selection changee pour composant Population (toggle): ' + populationEvent.checked);

    const toggleValue = populationEvent.checked;
    this.population.over = toggleValue;
    this.populationChanged.emit(this.population);
  }
}
