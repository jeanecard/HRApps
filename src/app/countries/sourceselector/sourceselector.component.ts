import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-sourceselector',
  templateUrl: './sourceselector.component.html',
  styleUrls: ['./sourceselector.component.scss']
})
export class SourceselectorComponent implements OnInit, ControlValueAccessor {


  sources: string[] = ['Topography'];

  constructor() { 
    
  }
  writeValue(obj: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit() {
  }

}
