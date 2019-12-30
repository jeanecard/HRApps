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
export class HRCountryFilterComponent implements OnInit, ControlValueAccessor, AfterViewInit {

  propagateChange = (_: any) => {};
  propagateTouch  = (_: any) => {};
  countriesFilterForm : FormGroup;

  constructor() {
 
   }

  ngOnInit() {
   //No initialisation in this Control. Region and Population can init by themselves.
   this.countriesFilterForm = new FormGroup({
    regionAndLanguage: new FormControl(),
    population:new FormControl()
  });
 
    this.countriesFilterForm.valueChanges.subscribe(filterValue => {
      this.propagateChange(filterValue);
      this.propagateTouch(filterValue);      
       });

  }

  ngAfterViewInit(): void {
    console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
    //! Pas catholique ...
    let extEvt = {
      regionAndLanguage :{
        region: this.countriesFilterForm.controls['regionAndLanguage'].value.region,
        language: this.countriesFilterForm.controls['regionAndLanguage'].value.language
      },
      population :{
        amount:this.countriesFilterForm.controls['population'].value.amount,
        over: this.countriesFilterForm.controls['population'].value.over

      }
    };
    this.propagateChange(extEvt);
    this.propagateTouch(extEvt);
  }

  writeValue(value: any): void {
    console.log('AAAAAAAAAAAAAAAAAAAAAAA');
    console.log(value);
    this.countriesFilterForm.patchValue({
      regionAndLanguage :{
      region: value.regionAndLanguage.region,
      language: value.regionAndLanguage.language
      },
      population:{
        amount: value.population.amount,
        over:value.population.over
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

    // this.countriesFilterForm.controls['regionFilterCtrl'].setValue({region: Region.Africa});
    // this.countriesFilterForm.controls['population'].setValue({amount: '5000000',over:true, saucisse:'cocktail'});
    this.countriesFilterForm.patchValue({
      regionAndLanguage: {language:'fr', region: Region.Asia },
      population:{
          amount: '5000000',
          over:true,
          saucisse:'cocktail'
        }
    });
  }
}
