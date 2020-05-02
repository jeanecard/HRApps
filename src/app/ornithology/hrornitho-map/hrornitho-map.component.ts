import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-hrornitho-map',
  templateUrl: './hrornitho-map.component.html',
  styleUrls: ['./hrornitho-map.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HROrnithoMapComponent),
      multi: true
    }]
})
export class HROrnithoMapComponent implements OnInit, ControlValueAccessor {

  constructor() { }
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
  }

}
