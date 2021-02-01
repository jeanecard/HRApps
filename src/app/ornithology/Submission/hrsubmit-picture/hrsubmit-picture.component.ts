import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-hrsubmit-picture',
  templateUrl: './hrsubmit-picture.component.html',
  styleUrls: ['./hrsubmit-picture.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HRSubmitPictureComponent),
      multi: true
    }]
})
export class HRSubmitPictureComponent implements OnInit, ControlValueAccessor {

  public submitPicture: FormGroup = null;
  public vernacularName: FormControl = null;
  public pictureList: FormControl = null;
  public _propagateChange = (_: any) => { };
  public _propagateTouch = (_: any) => { };

  constructor() { }
  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    this._propagateChange(fn);
  }
  registerOnTouched(fn: any): void {
    this._propagateTouch(fn);

  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.vernacularName = new FormControl();
    this.pictureList = new FormControl();
    this.pictureList.disable({emitEvent : false, onlySelf : true});
    this.submitPicture = new FormGroup({
      vernacularName: this.vernacularName,
      pictureList: this.pictureList
    });

    this.vernacularName.valueChanges.subscribe(
      {
        next: data => {
          this._propagateChange(data);
          this._propagateTouch(data);
          if(data){
            this.pictureList.enable({ onlySelf: true, emitEvent: false });
            this.pictureList.setValue(data);
          }else{
            this.pictureList.setValue(null,{emitEvent:false});
            this.pictureList.disable({ onlySelf: true, emitEvent: false });
          }
        },

        error: (data) => {
          console.log("TODO");
          console.log(data);
        },
        complete: () => {
          //Dummy in this version.
        }
      });
  }
}
