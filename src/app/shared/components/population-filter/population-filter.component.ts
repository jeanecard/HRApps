import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PopulationFilterModel } from 'src/app/model/population-filter-model';
import { ReactiveFormsModule } from '@angular/forms';
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
  public amountCtrl = new FormControl('5000000');
  public overCtrl = new FormControl(true);


  constructor() { }

  ngOnInit() {
  }

  onSelection(populationEvent: MatSelectChange) {
    const populationValue = populationEvent.value;
    this.population.amount = populationValue;
    this.populationChanged.emit(this.population);
  }
  onToggle(populationEvent: MatSlideToggleChange) {
    const toggleValue = populationEvent.checked;
    this.population.over = toggleValue;
    this.populationChanged.emit(this.population);
  }

}
