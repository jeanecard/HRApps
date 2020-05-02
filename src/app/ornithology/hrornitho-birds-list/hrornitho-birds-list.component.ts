import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { HROrnithoBirdsService } from 'src/app/shared/hrornitho-birds.service';
import { Subscription } from 'rxjs';
import { HRBirdModel } from 'src/app/model/hrbird-model';

@Component({
  selector: 'app-hrornitho-birds-list',
  templateUrl: './hrornitho-birds-list.component.html',
  styleUrls: ['./hrornitho-birds-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HROrnithoBirdsListComponent),
      multi: true
    }]
})
export class HROrnithoBirdsListComponent implements OnInit, ControlValueAccessor {

  private serviceSubscription : Subscription = null;
  public isDatabaseWorking = false;
  public hrBirdsInfoDisplayed : HRBirdModel[];
  public isMoreBirds = true;



  constructor( private service : HROrnithoBirdsService) { 
    this.hrBirdsInfoDisplayed = [];
  }
  writeValue(obj: any): void {

    // TODO
  }
  registerOnChange(fn: any): void {
    // TODO
  }
  registerOnTouched(fn: any): void {
    // TODO
  }
  setDisabledState?(isDisabled: boolean): void {
    // TODO
  }

  ngOnInit() {
    this.isDatabaseWorking = true;
    this.serviceSubscription = this.service.getBirds().subscribe(data =>{
      this.isDatabaseWorking = false;
      this.hrBirdsInfoDisplayed = data;
    });

  }

}
