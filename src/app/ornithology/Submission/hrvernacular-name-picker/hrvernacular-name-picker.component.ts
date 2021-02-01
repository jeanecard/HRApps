import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { HRVernacularNameSubmissionService } from 'src/app/shared/Ornithology/hrvernacular-name-submission.service';

@Component({
  selector: 'app-hrvernacular-name-picker',
  templateUrl: './hrvernacular-name-picker.component.html',
  styleUrls: ['./hrvernacular-name-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HRVernacularNamePickerComponent),
      multi: true
    }]  
})
export class HRVernacularNamePickerComponent implements OnInit, ControlValueAccessor {

  public propagateChange = (_: any) => { };
  public propagateTouch = (_: any) => { };
  public results : string[];

  public isLoading = false;
  public isWaiting = false;
  public isNoData = false;
  public remaining = 3;
  public vernacularName : FormControl;
  private timerSubscription = new Subscription();
  private vernacularSubscription = new Subscription();
  private everySecond: Observable<number> = timer(0, 1000);

  constructor(private vernacularService : HRVernacularNameSubmissionService) { }
  writeValue(obj: any): void {
    // throw new Error('Method not yet implemented.');
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // Dummy for the moment.
  }


  ngOnInit(): void {
   this.results = [];
   this.vernacularName = new FormControl('');
   this.vernacularName.valueChanges.subscribe
     (
       {
         next: data => {

          this.propagateChange(null);
          this.propagateTouch(null);

           this.vernacularSubscription.unsubscribe();
           this.timerSubscription.unsubscribe();
           this.remaining = 3;
           this.results = null;
           this.timerSubscription = this.everySecond.pipe(take(3)).subscribe(
             {
               next:
                 dataTimer => {
                   this.isWaiting = true;
                   this.isLoading = false;
                   this.remaining--;
                   this.isNoData = false;
                 },
               error: (dataError) => {
                 console.log(dataError);
                 this.timerSubscription.unsubscribe();
               },
               complete: () => {
                 this.timerSubscription.unsubscribe();
                 this.vernacularSubscription = new Subscription();
                 this.results = null;
                 this.isWaiting = false;
                 this.isLoading = true;
                 this.isNoData = false;
                 this.vernacularSubscription =
                   this.vernacularService.getExistingVernacularNames(data).subscribe({
                     next: (val) => {
                     this.isLoading = false;
                     this.results = val;
                     if (val && val.length > 0) {
                       this.isNoData = false;
                     } else {
                       this.isNoData = true;
                     }
                   },
                    error: (dataError) =>{
                    this.vernacularSubscription.unsubscribe();
                    },
                    complete: () =>{
                      this.vernacularSubscription.unsubscribe();
                  }
               });
               }
             });
         },
         error: (data) => {
          this.propagateChange(null);
          this.propagateTouch(null);


           this.timerSubscription.unsubscribe();
           this.vernacularSubscription.unsubscribe();            
           this.isLoading = false;
           this.results = null;
         },
         complete: () => {
           this.vernacularSubscription.unsubscribe();
           this.timerSubscription.unsubscribe();
           this.isLoading = false;
           //Dummy in this version.
         }
       });
  }

  public onOptionSelected(data: any): void {
    // let newEvent = {
    //   vernacularName : data.option.value
    // }
    this.propagateChange(data.option.value);
    this.propagateTouch(data.option.value);
  }
}
