import { Component, OnInit, forwardRef } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { Region } from 'src/app/model/region';
import { Observable, from } from 'rxjs';
import { RegionService } from 'src/app/shared/region.service';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-region-filter',
  templateUrl: './region-filter.component.html',
  styleUrls: ['./region-filter.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RegionFilterComponent),
      multi: true
    }
  ]  
})
export class RegionFilterComponent implements ControlValueAccessor, OnInit  {
  regions$: Observable<Region[]>;
  isWorking: boolean;
  regionCtrl : FormControl;

  propagateChange = (_: any) => {};
  propagateTouch  = (_: any) => {};


  constructor(private regionService: RegionService) {
    //1-
    let regionFilterModel = regionService.getDefaultRegionFilterValue();
    //2-
    this.regionCtrl = new FormControl({
      value: regionFilterModel,
      disabled: false
    })
  }

  ngOnInit() {
    //1-
    this.isWorking = true;
    this.regions$ = this.regionService.getRegions();
    //2-
    this.regions$.subscribe(data => {
      this.isWorking = false;
    }
    );    
    //3-
    this.regionCtrl.valueChanges.subscribe(filterValue => {
      console.log('Region change');
      console.log(filterValue);
      this.propagateChange(filterValue);
      this.propagateTouch(filterValue);
       });
  }

  // Takes a new value from the form model and writes it into the view. 
  // Use Model driven to set Value
  writeValue(region: Region): void {
    console.log('Region write');
    console.log(region);

    if (region !== undefined){
      this.regionCtrl.setValue(region);
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
    
  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState');
  }
  onclick(){
    this.regionCtrl.setValue(Region.Africa);
  }
}
