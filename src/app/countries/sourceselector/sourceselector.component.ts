import { Component, OnInit, forwardRef } from '@angular/core';
import { FormArray, FormControl, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SourceMapService } from '../source-map.service';
import { SourceMapModel } from 'src/app/model/source-map-model';

@Component({
  selector: 'app-sourceselector',
  templateUrl: './sourceselector.component.html',
  styleUrls: ['./sourceselector.component.scss'],
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SourceselectorComponent),
      multi: true
    }
  ]
})
export class SourceselectorComponent implements OnInit, ControlValueAccessor {


  sourcesData: SourceMapModel[] = null;
  sourceSelectorForm : FormGroup = null;
  sourcesGroup : FormControl = null;
  

  constructor(private service : SourceMapService) { 
    this.sourcesData = service.getSources();
  }
  writeValue(obj: any): void {
    console.log('TODO : writeValue');
    console.log(obj);
    this.sourcesGroup.setValue(obj);
    
  }
  registerOnChange(fn: any): void {
    console.log('TODO : registerOnChange');
  
  }
  registerOnTouched(fn: any): void {
    console.log('TODO : registerOnTouched');
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('TODO : setDisabledState');
  }

  ngOnInit() {
    this.sourcesGroup = new FormControl('');
    this.sourceSelectorForm = new FormGroup({
      sourcesGroup : this.sourcesGroup,
    });
  }
}
