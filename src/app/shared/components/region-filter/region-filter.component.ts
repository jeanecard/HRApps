import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { Region } from 'src/app/model/region';
import { Observable, from, Subscription } from 'rxjs';
import { RegionService } from 'src/app/shared/region.service';
import { FormControl, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { Language } from 'src/app/model/language';
import { LanguageService } from '../../language.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-region-filter',
  templateUrl: './region-filter.component.html',
  styleUrls: ['./region-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RegionFilterComponent),
      multi: true
    }
  ]
})
export class RegionFilterComponent implements ControlValueAccessor, OnInit, OnDestroy {
  regions$: Observable<Region[]>;
  isRegionWorking: boolean;

  languages$: Observable<Language[]>;
  isLanguageWorking: boolean;
  languagesCount: number;
  languageFilterForm: FormGroup;
  region : FormControl;
  language : FormControl;
  private _subscription: Subscription = new Subscription();

  propagateChange = (_: any) => { };
  propagateTouch = (_: any) => { };

  


  constructor(private regionService: RegionService, private languageService: LanguageService) {
  }

  /**
  * Init all the FormControls
  * 
  * 1- Get region and language default value from services
  * 2- Instanciate FormGroup and FormControls.
  * 3- Launch the specific initialisation for internal Forms.
  */
  ngOnInit() {
    //1-
    let regionFilterModel = this.regionService.getDefaultRegionFilterValue();
    let languageFilterModel = this.languageService.getDefaultLanguageFilterValue();
    //2-
     this.region = new FormControl();
     this.language = new FormControl();

    this.languageFilterForm = new FormGroup({
      region: this.region,
      language: this.language 
    });
    //3-
    this.initRegion(regionFilterModel);
    this.initLanguage(regionFilterModel, languageFilterModel);
  }
  /**
  * Destroy all subscription
  * 
  */
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }


  /**
   * Init the Region FormControl
   *
   * 1- set workingregion flag to True
   * 2- subscribe to GetRegion service only for first emission as all Regions are requested and no changes are expected.
   *  2.1- set workingregion flag to false on next.
   * 3- Subscribe on Change Region values to set Language to null.
   *  3.1- propagate Event (Region: new / Language: null) to Observer
   *  3.2- subscribe to the first emission of languages for this region to fill up all availables languages
   *  3.3- set value of languages to null once languages are loaded.
   * @param region Initializes the control with an initial value,
   */

  initRegion(region: Region): void {
    //1-
    this.isRegionWorking = true;
    //2-
    this.regions$ = this.regionService.getRegions();
    this._subscription.add(this.regions$.pipe(take(1)).subscribe(
      //2.1-
      data => {
        this.isRegionWorking = false;
      }
    ));
    //3-
   
    
    this._subscription.add(this.languageFilterForm.controls['region'].valueChanges.subscribe(
      {
        
        next: filterValue => {
          //3.1-
          let extEvt = {
            region: filterValue,
            language: ''
          };
          this.propagateChange(extEvt);
          this.propagateTouch(extEvt);

          this.changeRegionLanguages(filterValue);
        },
        error: (data) => {
          console.log('ERREUR DETECTEE');
          console.log(data);
        },
        complete: () => {
          //Dummy in this version.
        }
      }));
  }

  private changeRegionLanguages(region : Region, languageSelected? : Language) : void {
    if (region) {
      this.isLanguageWorking = true;
      this.languages$ = this.languageService.getLanguagesByContinent(region);
      //3.2-
      this.languages$.pipe(take(1)).subscribe(data => {
        this.isLanguageWorking = false;
        if (data) {
          this.languagesCount = data.length;
        }
        //3.3-
        let language_to_set = '';
        if(languageSelected){
          language_to_set = languageSelected.iso639_1;
        }
        //Que faire si ce language n'existe pas .. le modele va faire croire qu'il est setté mais en fait non ...
        this.languageFilterForm.patchValue({
          language: language_to_set,
        }, { emitEvent: false });
      });
    }
  }

  /**
 * Init the Language FormControl
 *
 * @param region Initializes the control with an initial value
 *
 * @param lang Initializes the control with an initial value
 *
 * 1- set language Working to true
 * 2- subscribe just one time to languages services to get all languages at initialisation
 *  2.1- set language Working to false
 *  2.2- set language count value
 *  2.3- emit final initialisation configuration for observers
 * 3- Subscribe to languageCtrl changes to re-emit event to Observers
 */
  initLanguage(region: Region, lang: Language): void {
    //! TODO mieux comme ça !! => this.changeRegionLanguages(region, lang);
    //1-
    this.isLanguageWorking = true;
    //2-
    this.languages$ = this.languageService.getLanguagesByContinent(region);
    this.languages$.pipe(take(1)).subscribe(data => {
      //2.1-
      this.isLanguageWorking = false;
      //2.2-
      if (data) {
        this.languagesCount = data.length;
      }
      //2.3-
      let extEvt = {
        region: region,
        language: lang.iso639_1
      };
      //this.propagateChange(extEvt);
      //this.propagateTouch(extEvt);

    });
    //3-
    this._subscription.add(this.languageFilterForm.controls['language'].valueChanges.subscribe(filterValue => {
      let extEvt = {
        region: this.languageFilterForm.controls['region'].value,
        language: filterValue
      };
      this.propagateChange(extEvt);
      this.propagateTouch(extEvt);
    }));
  }

  /**
   * @description
   * Writes a new value to the element.
   *
   * This method is called by the forms API to write to the view when programmatic
   * changes from model to view are requested. For exemple 
   *  - on the new Form(obj)
   *  - on set / patch value on this FormController. (generally called by parents containing this control)
   *
   * @usageNotes
   * ### Write a value to the element
   * ### after method, value property of the form will return {amount : a_value, over : other_value}
   *
   * @param obj The new value for the element. Model expected : {region: enum, language : string)
   */
  writeValue(obj: any): void {
    let language = new Language();
    if (obj && obj != undefined) {
      if (obj.region != undefined) {
        if (obj.language != undefined) {
          language.iso639_1 = obj.language;
          this.languageFilterForm.patchValue({
            region: obj.region
          }, { emitEvent: false });
          this.changeRegionLanguages(obj.region, language);
        } else {
          this.languageFilterForm.patchValue({
            region: obj.region
          }, { emitEvent: false });
        }
      }
      else if (obj.language != undefined) {
        language.iso639_1 = obj.language;
        let region = this.languageFilterForm.controls['region'].value;
        this.changeRegionLanguages(region, language);
        this.languageFilterForm.patchValue({
          language: obj.language
        }, { emitEvent: false });
      }
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;

  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  onClick(){
    this.languageFilterForm.patchValue({
      region: Region.Africa,
      language: 'fr'
    });
  }
}
