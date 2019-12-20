import { Component, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { PopulationFilterModel } from 'src/app/model/population-filter-model';
import { FormControl, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HRPopulationValuesService } from '../../hrpopulation-values.service';
import { Observable } from 'rxjs';
import { IValueName } from 'src/app/model/value-name';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'app-population-filter',
  templateUrl: './population-filter.component.html',
  styleUrls: ['./population-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PopulationFilterComponent),
      multi: true
    }
  ]
})
export class PopulationFilterComponent implements OnInit, ControlValueAccessor {

  propagateChange = (_: any) => {};
  propagateTouch  = (_: any) => {};
  
  populationFilterForm: FormGroup;
  populationsFilter: Observable<Array<IValueName>>;

  //1- Get default values from service
  //2- Create FormGroup and FormControls
  constructor(private populationService: HRPopulationValuesService) {
    //1-
    // let populationFilterModel = populationService.getDefaultPopulationFilterValue();
    // //2-
    // this.populationFilterForm = new FormGroup({
    //   amountCtrl: new FormControl({
    //     value: String(populationFilterModel.amount),
    //     disabled: false
    //   }),
    //   overCtrl: new FormControl({
    //     value: populationFilterModel.over,
    //     disabled: false
    //   })
    // });
    let populationFilterModel = populationService.getDefaultPopulationFilterValue();
    //2-
    this.populationFilterForm = new FormGroup({
      amountCtrl: new FormControl({
        disabled: false
      }),
      overCtrl: new FormControl({
        disabled: false
      })
    });

  }
  //1- Get Observable Populations from service
  //2- Susbcribe to populate FromControls
  //3- Subscribe to FormGroup change
  ngOnInit() {
    //1-
    this.populationsFilter = this.populationService.getPopulationsValues();
    //2-
    this.populationsFilter.subscribe(data => {
    });
    //3-
    this.populationFilterForm.valueChanges.subscribe(filterValue => {
      console.log('population change');
      console.log(filterValue);    
      this.propagateChange(filterValue);
      this.propagateTouch(filterValue);
    });
  }

  writeValue(obj: any): void {
    console.log('population write');
    console.log(obj);
    if (obj != undefined) {
      this.populationFilterForm.patchValue({
        amountCtrl: String(obj.amount),
        overCtrl: obj.over
      });
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
    
  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log('PopulationFilterComponent setDisabledState');
  }
  onclick() {
    // this.writeValue({
    //   amount: '5000000',
    //   over: true
    // });
    this.populationFilterForm.patchValue({
      amountCtrl: '5000000',
      overCtrl: true
    });
  }
}

