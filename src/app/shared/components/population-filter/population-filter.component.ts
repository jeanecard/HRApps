import { Component, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { PopulationFilterModel } from 'src/app/model/population-filter-model';
import { FormControl, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HRPopulationValuesService } from '../../hrpopulation-values.service';
import { Observable } from 'rxjs';
import { IValueName } from 'src/app/model/value-name';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { take } from 'rxjs/operators';

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

  propagateChange = (_: any) => { };
  propagateTouch = (_: any) => { };

  populationFilterForm: FormGroup;
  populationsFilter: Observable<Array<IValueName>>;

  constructor(private populationService: HRPopulationValuesService) {

  }
  //1- Get Observable Populations from service
  //2- Susbcribe to populate FromControls
  //3- Subscribe to FormGroup change
  ngOnInit() {

    let populationFilterModel = this.populationService.getDefaultPopulationFilterValue();
    //2-
    this.populationFilterForm = new FormGroup({
      amount: new FormControl(String(populationFilterModel.amount)),
      over: new FormControl(populationFilterModel.over)
    });
    //1-
    this.populationsFilter = this.populationService.getPopulationsValues();
    //2-
    this.populationsFilter.pipe(take(1)).subscribe(data => {
    });
    //3-
    this.populationFilterForm.valueChanges.subscribe(filterValue => {
      this.propagateChange(filterValue);
      this.propagateTouch(filterValue);
    });
  }
  /**
   * @description
   * Writes a new value to the element.
   *
   * This method is called by the forms API to write to the view when programmatic
   * changes from model to view are requested. For exemple 
   *  - on the new Form(obj)
   *  - on set / patch value on this FormController. (generally called by parents containing this control)
   *
   * @usageNotes
   * ### Write a value to the element
   * ### after method, value property of the form will return {amountCtrl : a_value, over : other_value}
   *
   * @param obj The new value for the element. Model expected : {amount: number or String, over : boolean)
   */
  writeValue(obj: any): void {
    if (obj && obj != undefined) {
      if (obj.amount != undefined) {
        if (obj.over != undefined) {
          this.populationFilterForm.patchValue({
            amount: String(obj.amount),
            over: obj.over
          },  { emitEvent: false });
        } else {
          this.populationFilterForm.patchValue({
            amount: String(obj.amount)
          },  { emitEvent: false });
        }
      }
      else if (obj.over != undefined) {
        this.populationFilterForm.patchValue({
          over: obj.over
        },  { emitEvent: false });
      }
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;

  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }
  onclick() {
    this.writeValue({ amount: 5000000, over: true });
    // this.populationFilterForm.patchValue({
    //   amount: '5000000',
    //   over: true
    // });
  }
}

