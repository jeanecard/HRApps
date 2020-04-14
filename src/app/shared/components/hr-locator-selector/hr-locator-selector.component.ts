import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subscription, timer } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { GeonameService } from '../../geoname.service';
import { GeonameOutput } from 'src/app/model/geoname';

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

  public results: GeonameOutput;



  public propagateChange = (_: any) => { };
  public propagateTouch = (_: any) => { };
  public selector: FormControl;
  public selectedOption: FormControl;
  public selectorForm: FormGroup;
  public isLoading = false;
  public isWaiting = false;
  public isNoData = false;
  public remaining = 3;
  private serviceSubscription = new Subscription();
  private timerSubscription = new Subscription();

  private  everySecond: Observable<number> = timer(0, 1000);

  constructor(private geonamesService: GeonameService) { }
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

            this.timerSubscription.unsubscribe();
            this.remaining = 3;
            this.timerSubscription = this.everySecond.pipe(take(3)).subscribe(data=>{
              this.remaining --;
            })
        

            this.isWaiting = true;
            this.isNoData = false;
            this.serviceSubscription.unsubscribe();
            this.serviceSubscription = new Subscription();
            this.isLoading = false;
            this.results = null;
            
            this.serviceSubscription.add(timer(2000).pipe(take(1)).subscribe(val => {
              this.isWaiting = false;
              this.isLoading = true;
              this.geonamesService.getPlaces(data).subscribe(val => {
                this.isLoading = false;
                this.results = val;
                if(val && val.totalResultsCount > 0){
                  this.isNoData = false;
                }else{
                  this.isNoData = true;
                }
              });
            }));
          },

          error: (data) => {
            this.isLoading = false;
            this.results = null;
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
  public onOptionSelected(data: any): void {
    let newEvent = {
      "center": {
        "lat": data.option.value.lat,
        "lon": data.option.value.lng
      }
    }
    this.propagateChange(newEvent);
    this.propagateTouch(newEvent);
  }

  public displayWith(val: any): string | null {
    if (val) {
      return val.name;
    }
    return null;
  }
}
