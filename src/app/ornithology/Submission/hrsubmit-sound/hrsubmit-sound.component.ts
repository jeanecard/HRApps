import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-hrsubmit-sound',
  templateUrl: './hrsubmit-sound.component.html',
  styleUrls: ['./hrsubmit-sound.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HRSubmitSoundComponent),
      multi: true
    }]
  
})
export class HRSubmitSoundComponent implements OnInit, ControlValueAccessor {

  constructor() { }
  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
