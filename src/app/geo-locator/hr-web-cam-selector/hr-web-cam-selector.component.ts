import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RangeModel } from 'src/app/model/range-model';

@Component({
  selector: 'app-hr-web-cam-selector',
  templateUrl: './hr-web-cam-selector.component.html',
  styleUrls: ['./hr-web-cam-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HrWebCamSelectorComponent),
      multi: true
    }
  ]
})
/**
* @description
* Component to manage the range of HrWebCamSelection
* Model : RangeModel
* range in km
*
*/
export class HrWebCamSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {

  public minRange : number;
  public maxRange : number;
  public rangeValue : number;
  public propagateChange = (_: any) => { };
  public propagateTouch = (_: any) => { };
  public range: FormControl;
  public toggle: FormControl;
  public webCamRange: FormGroup;

  private rangeSubscription = new Subscription();
  private toggleSubscription = new Subscription();
  private readonly _ERROR_MESSAGE_RANGE = 'ERROR IN this.range.valueChanges';
  private readonly _ERROR_MESSAGE_TOGGLE = 'ERROR IN this.toggle.valueChanges';


  constructor() { }
  /**
 * @description
 * Writes a new value to the element.
 *
 * This method is called by the forms API to write to the view when programmatic
 * changes from model to view are requested.
 *
 * @param  value is a RangeModel.
 * @returns void
 * @usageNotes
 * writeValue(aRangeModel);
 * ### Write a value to the element
 */
  writeValue(obj: RangeModel): void {
    if (obj) {
      if (obj.range !== undefined && obj.range != this.range.value) {
        this.range.setValue(obj.range);
      }
      if (obj.max !== undefined && obj.max != this.maxRange) {
        this.maxRange = obj.max;
      }
      if (obj.min !== undefined && obj.min != this.minRange) {
        this.minRange = obj.min;
      }
      if (obj.display != undefined && this.toggle.value !== obj.display) {
        this.toggle.setValue(obj.display);
      }
    }
  }
  /**
 * @description
 * Register the function to call when OnChange propagation is needed.
 *
 */
  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  /**
  * @description
  * Register the function to call when OnTouched propagation is needed.
  *
  */
  public registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
  /**
    * @description
    * Function that is called by the forms API when the control status changes to
    * or from 'DISABLED'. Depending on the status, it enables or disables the
    * appropriate DOM element.
    * @param isDisabled The disabled status to set on the element
    */
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.webCamRange.disable();

    } else {
      this.webCamRange.enable();
    }
    this.propagateChange({ range: this.range.value, min: this.minRange, max: this.maxRange, display: !isDisabled });
  }

  public ngOnInit() {
    this.range = new FormControl({});
    this.toggle = new FormControl(true);
    this.webCamRange = new FormGroup({
      range: this.range,
      toggle: this.toggle
    });

    this.rangeSubscription = this.range.valueChanges.subscribe(
      {
        next: data => {
          if (data != this.rangeValue) {
            this.rangeValue = data;
            this.propagateChange({ range: data, min: this.minRange, max: this.maxRange, display: this.toggle.enabled });
          }
        },
        error: (data) => {
          console.log(this._ERROR_MESSAGE_RANGE);
          console.log(data);
        },
        complete: () => {
          //Dummy in this version.
        }
      });

    this.toggleSubscription = this.toggle.valueChanges.subscribe(
      {
        next: data => {
          if (data) {
            this.range.enable();
          } else {
            this.range.disable();
          }
          this.propagateChange({ range: this.range.value, min: this.minRange, max: this.maxRange, display: data });

        },
        error: (data) => {
          console.log(this._ERROR_MESSAGE_TOGGLE);
          console.log(data);
        },
        complete: () => {
          //Dummy in this version.
        }
      });

  }

  public ngOnDestroy(): void {
    this.rangeSubscription.unsubscribe();
    this.toggleSubscription.unsubscribe();
  }
}
