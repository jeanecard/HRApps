import { Component, OnInit, forwardRef } from '@angular/core';
import { FormControl, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { HRPopulationValuesService } from '../../hrpopulation-values.service';
import { Observable, Subscription } from 'rxjs';
import { IValueName } from 'src/app/model/value-name';
import { take } from 'rxjs/operators';
import { IPopulation } from 'src/app/shared/components/hrcountry-filter/ipopulation'

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
  amount: FormControl;
  over: FormControl;
  populationsFilter: Observable<Array<IValueName>>;
  private _subscription: Subscription = new Subscription();

  /**
   * Constructor
   * @description 
   * Constructor.
   * @param populationService : The service to get all abvailable population amount.
   */
  constructor(private populationService: HRPopulationValuesService) {
    //Dummy.
  }

  /**
  * Destroy all subscription
  * 
  */
 ngOnDestroy(): void {
  this._subscription.unsubscribe();
}

  /**
   * @description 
   * Init component
   *  1- Instanciate Model
   *  2- Get an observable on available population and unsuscribe automatically as none update is expected.
   *  3- Suscribe on all model changes to propagate to parent.
   */
  ngOnInit() {
    //1-
    this.amount = new FormControl();
    this.over = new FormControl();
    this.populationFilterForm = new FormGroup({
      amount: this.amount,
      over: this.over
    });
    //2-
    this.populationsFilter = this.populationService.getPopulationsValues();
    this.populationsFilter.pipe(take(1)).subscribe(data => {
      //Dummy.
    });
    //3-
    this._subscription.add(this.populationFilterForm.valueChanges.subscribe(filterValue => {
      this.propagateChange(filterValue);
      this.propagateTouch(filterValue);
    }));
  }
  /**
   * @description
   * Writes a new value in the view.
   *
   * This method is called by the forms API to write to the view when programmatic
   * changes from model to view are requested. For example 
   *  - on the new Form(obj)
   *  - on set / patch value on this FormController. (generally called by parents containing this control)
   *
   * @usageNotes
   * ### Write a value to the element
   *  1- check obj validity
   *  2- setValue to populationFilterForm without emmiting event as we just need to update view.
   *  
   *
   * @param obj The new value for the element. Model expected : {amount: number or String, over : boolean) otherwise TypeError is thrown.
   */
  writeValue(obj: any): void {
    //1-
    if(obj == null 
      || obj == undefined 
      || (obj.amount == undefined ) 
      || (obj.over == undefined) ){
        let flattenObject = 'null or undefined';
        if(obj && obj != undefined){
        for (let propNamei in obj){
          flattenObject = flattenObject + '-' + obj[propNamei];
      }
        }
        throw TypeError('Can not set ' + flattenObject + ' in view because argument is null, undefined or does not contain amount or over property. Use FormControl.value before SetValue / PatchValue.');
      }else{
        //2-
        this.populationFilterForm.setValue({
          amount: String(obj.amount),
          over: obj.over
        },{emitEvent: false});
      }
    }
  
  registerOnChange(fn: any): void {
    this.propagateChange = fn;

  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    //Not impplmented in this version.
  }
}

