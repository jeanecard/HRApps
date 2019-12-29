import { Component, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { Region } from 'src/app/model/region';
import { Language } from 'src/app/model/language';
import { PopulationFilterModel } from 'src/app/model/population-filter-model';
import { HRCountryFilterModel } from 'src/app/model/hrcountry-filter-model';
import { ThrowStmt } from '@angular/compiler';
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

  countriesFilterForm = new FormGroup({
    regionFilterCtrl: new FormControl({
      disabled: false
    }),
    // languageFilterCtrl: new FormControl({
    //   disabled: false
    // }),
    populationFilterCtrl:new FormControl()
  });

  constructor() {
   }

  ngOnInit() {
    this.countriesFilterForm.controls['regionFilterCtrl'].valueChanges.subscribe(filterValue => {
      this.onChange(filterValue);      
      this.propagateChange(filterValue);
      this.propagateTouch(filterValue);      
       });
  }

  onChange(value : any){
    console.log('HRCountry recoit');
    console.log(value);
    //this.writeValue(value);
  }

  writeValue(value: any): void {
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
    this.countriesFilterForm.patchValue({
      regionFilterCtrl: Region.Africa,
      languageFilterCtrl:{iso639_1: "fr", iso639_2: "fra", name: "French", nativeName: "français"},
       populationFilterCtrl:{
         amount: '5000000'
       }
    });
  }
}
