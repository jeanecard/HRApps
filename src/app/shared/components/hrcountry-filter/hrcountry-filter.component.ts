import { Component, OnInit, Output, EventEmitter, forwardRef, AfterViewInit } from '@angular/core';
import { Region } from 'src/app/model/region';
import { FormControl, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-hrcountry-filter',
  templateUrl: './hrcountry-filter.component.html',
  styleUrls: ['./hrcountry-filter.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HRCountryFilterComponent),
      multi: true
    }
  ]  
})
export class HRCountryFilterComponent implements OnInit, ControlValueAccessor {

  propagateChange = (_: any) => {};
  propagateTouch  = (_: any) => {};
  countriesFilterForm : FormGroup;
  regionAndLanguage : FormControl;
  population : FormControl;

  constructor() {
    //Dummy.
    }

  ngOnInit() {
    this.regionAndLanguage = new FormControl();
    this.population = new FormControl();
   this.countriesFilterForm = new FormGroup({
    regionAndLanguage: this.regionAndLanguage,
    population: this.population
  });
 
    this.countriesFilterForm.valueChanges.subscribe(filterValue => {
      console.log('HRCountryFilterComponent RECOIT UN EVENEMNT');
      console.log(filterValue);
      this.propagateChange(filterValue);
      this.propagateTouch(filterValue);      
       });

  }

  writeValue(value: any): void {
    this.countriesFilterForm.patchValue({
      regionAndLanguage :{
      region: value.regionAndLanguage.region,
      language: value.regionAndLanguage.language
      },
      population:{
        amount: value.population.amount,
        over:value.population.over,
      }}, {emitEvent: false});

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
    
  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  onclick(){
    console.log(this.population.value);
    let initialState = this.population.value;
    this.population.setValue({amount: 100000, over : true});
    console.log(this.population.value);
  }
}
