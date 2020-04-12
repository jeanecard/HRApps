import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import 'ol/ol.css';
import { Observable, Subscription } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormGroup, FormControl } from '@angular/forms';
import { HRBorderFilterPreferencesService } from 'src/app/shared/hrborder-filter-preferences.service';
import { HRBorderFilterModel } from 'src/app/model/hrborder-filter-model';

@Component({
  selector: 'app-main-countries',
  templateUrl: './main-countries.component.html',
  styleUrls: ['./main-countries.component.scss']
})
export class MainCountriesComponent implements OnInit, AfterViewInit, OnDestroy {

  mainBorderForm: FormGroup;
  hrCountryFilter: FormControl;
  bordersMap: FormControl;
  hrLayerSelector: FormControl;

  countriesList: any; //!todo
  private subscription : Subscription;

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  breakpoint = 1;


  constructor(private breakpointObserver: BreakpointObserver,
    private prefService: HRBorderFilterPreferencesService,
  ) { 
    this.subscription = new Subscription();
  }

  ngOnDestroy(): void {
    let countryFilterVal = this.hrCountryFilter.value;
    let selectedLayerName = this.hrLayerSelector.value;
    let reworkedFilter: HRBorderFilterModel = {
      countryFilter: countryFilterVal,
      map: selectedLayerName
    };
    this.prefService.setDefaultValue(reworkedFilter);
    this.subscription.unsubscribe();

  }

  ngOnInit() {
    //1- CountryFilter
    let prefs = this.prefService.getDefaultValue();
    this.hrCountryFilter = new FormControl(prefs.countryFilter);
    //2- Map
    this.bordersMap = new FormControl(prefs);

    //3-Map selector
    this.hrLayerSelector = new FormControl(prefs.map);

    this.mainBorderForm = new FormGroup({
      hrCountryFilter: this.hrCountryFilter,
      bordersMap: this.bordersMap,
      hrLayerSelector: this.hrLayerSelector
    });

    this.subscription.add(this.hrCountryFilter.valueChanges.subscribe(filterValue => {
      let reworkedFilter: HRBorderFilterModel = {
        countryFilter: filterValue,
        map: null
      }

      this.bordersMap.setValue(reworkedFilter);
    }));
    this.subscription.add(this.hrLayerSelector.valueChanges.subscribe(data => {
      let reworkedEvent: HRBorderFilterModel = {
        map : data,
        countryFilter : null
      }
      this.bordersMap.setValue(reworkedEvent);
    }));
  }

  ngAfterViewInit() {
  }
}




