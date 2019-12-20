import { Component, OnInit, forwardRef } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { Language } from 'src/app/model/language';
import { Observable, from } from 'rxjs';
import { LanguageService } from 'src/app/shared/language.service';
import { Region } from 'src/app/model/region';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-language-filter',
  templateUrl: './language-filter.component.html',
  styleUrls: ['./language-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LanguageFilterComponent),
      multi: true
    }
  ]
})
export class LanguageFilterComponent implements OnInit, ControlValueAccessor {
  propagateChange = (_: any) => {};
  propagateTouch  = (_: any) => {};

  languages$: Observable<Language[]>;
  isWorking: boolean;
  languagesCount: number;
  languageFilterForm: FormGroup;

  //Instanciate FormControl with no initial value.
  constructor(private languageService: LanguageService) {
    //1-
    this.languageFilterForm = new FormGroup({
      languageCtrl: new FormControl({
        disabled: false
      })
    });
  }

  //1- Suscribe to languageservice
  //2- Plug onChange on FormControl
  ngOnInit() {
    //1-
    this.isWorking = true;
    this.languages$ = this.languageService.getLanguagesByContinent(null);
    this.languages$.subscribe(data => {
      this.isWorking = false;
      if (data) {
        this.languagesCount = data.length;
      }
    });
    //2-
    this.languageFilterForm.valueChanges.subscribe(filterValue => {
      console.log('language change');
      console.log(filterValue);    
      this.propagateChange(filterValue);
      this.propagateTouch(filterValue);
    });

  }
  writeValue(obj: any): void {
    console.log('language write');
    console.log(obj);
    if (obj != undefined) {
      this.languageFilterForm.patchValue({
        languageCtrl: obj.iso639_1 ,
      });
    }
  }
  registerOnChange(fn: any): void {

    this.propagateChange = fn;
    
  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('Appel de setDisabledState');
  }
  onclick() {
     this.writeValue({ iso639_1: "fr"});
    // this.languageFilterForm.patchValue({
    //   languageCtrl:  "fr",
    // });
  }

}
