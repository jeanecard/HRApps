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
  regionCtrl: FormControl;
  languages$: Observable<Language[]>;
  isLanguageWorking: boolean;
  languagesCount: number;
  languageFilterForm: FormGroup;
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
    this.languageFilterForm = new FormGroup({
      regionCtrl: new FormControl(regionFilterModel),
      languageCtrl: new FormControl(languageFilterModel.iso639_1)
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
    this._subscription.add(this.languageFilterForm.controls['regionCtrl'].valueChanges.subscribe(
      {
        next: filterValue => {
          //3.1-
          let extEvt = {
            region: filterValue,
            language: ''
          };
          this.propagateChange(extEvt);
          this.propagateTouch(extEvt);
          if (filterValue) {
            this.isLanguageWorking = true;
            this.languages$ = this.languageService.getLanguagesByContinent(filterValue);
            //3.2-
            this.languages$.pipe(take(1)).subscribe(data => {
              this.isLanguageWorking = false;
              if (data) {
                this.languagesCount = data.length;
              }
              //3.3-
              this.languageFilterForm.patchValue({
                languageCtrl: '',
              }, { emitEvent: false });
            });
          }
        },
        error: (data) => {
          console.log('ERREUR DETECTEE');
          console.log(data);
        },
        complete: () => {
          console.log('COMPLETE REALISE');
        }
      }));
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
    //1-
    this.isLanguageWorking = true;
    //2-
    this.languages$ = this.languageService.getLanguagesByContinent(region);
    let subscribResult = this.languages$.pipe(take(1)).subscribe(data => {
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
      this.propagateChange(extEvt);
      this.propagateTouch(extEvt);

    });
    //3-
    this._subscription.add(this.languageFilterForm.controls['languageCtrl'].valueChanges.subscribe(filterValue => {
      let extEvt = {
        region: this.languageFilterForm.controls['regionCtrl'].value,
        language: filterValue
      };
      this.propagateChange(extEvt);
      this.propagateTouch(extEvt);
    }));
  }

  // Takes a new value from the form model and writes it into the view. 
  // Use Model driven to set Value
  writeValue(value: any): void {
    console.log('Region and Language write');
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;

  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState');
  }
  // onclick() {

  //   let extEvt = {
  //     region: Region.Africa,
  //     language: 'fr'
  //     //Et propagation
  //   };
  //   this.propagateChange(extEvt);
  //   this.propagateTouch(extEvt);

  //   // this.languageFilterForm.patchValue({
  //   //   languageCtrl: null,
  //   //   regionCtrl: String(Region.Africa)
  //   // }, { emitEvent: false });

  //   // let languageFilterModel = this.languageService.getDefaultLanguageFilterValue();
  //   // this.languageFilterForm.controls['languageCtrl'].setValue('fr');
  //   //this.languageFilterForm.controls['regionCtrl'].setValue(Region.Africa);


  //   // this.languageFilterForm.patchValue({
  //   //   regionCtrl: String(Region.Africa),
  //   // });
  // }
}
