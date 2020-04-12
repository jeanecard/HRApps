import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subscription, timer } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-hr-locator-selector',
  templateUrl: './hr-locator-selector.component.html',
  styleUrls: ['./hr-locator-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HrLocatorSelectorComponent),
      multi: true
    }]
})
export class HrLocatorSelectorComponent implements OnInit, ControlValueAccessor {

  public results : string[];



  public propagateChange = (_: any) => { };
  public propagateTouch = (_: any) => { };
  public selector : FormControl;
  public selectedOption : FormControl;
  public selectorForm : FormGroup;
  public isLoading = false;
  private serviceSubscription = new Subscription();

  constructor() { }
  writeValue(obj: any): void {
    console.log('TODO');
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
  //Dummy.
}

  ngOnInit() {

    this.selector = new FormControl('');
    this.selector.valueChanges.subscribe
    (
      {
        next: data => {
          console.log('Je vais devoir traiter : ' + data);
          this.serviceSubscription.unsubscribe();
          this.serviceSubscription = new Subscription();
          this.isLoading = true;
          this.results = [];
          this.serviceSubscription.add(of(['a', 'b', 'c']).pipe(delay(3000)).subscribe(val => {
            console.log('Je traite : ' + data);
            val.push(data);
            this.results = val;
            this.isLoading = false;
          }));
       },
       
        error: (data) => {
          this.isLoading = false;
          this.results = [];
          console.log("TODO");
          console.log(data);
        },
        complete: () => {
          this.isLoading = false;
          //Dummy in this version.
        }
      });





    this.selectorForm = new FormGroup({
      mapName: this.selector,
    });

  }
  public onOptionSelected(data : any) : void{
    console.log(data.option.value);
  }
}
