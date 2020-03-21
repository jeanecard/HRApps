import { Component, OnInit, AfterViewInit } from '@angular/core';
import 'ol/ol.css';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormGroup, FormControl } from '@angular/forms';
import { HRCountryFilterPreferencesService } from 'src/app/shared/hrcountry-filter-preferences.service';
import { CountriesRoutingModule } from '../countries-routing.module';

@Component({
  selector: 'app-main-countries',
  templateUrl: './main-countries.component.html',
  styleUrls: ['./main-countries.component.scss']
})
export class MainCountriesComponent implements OnInit, AfterViewInit {

  mainBorderForm: FormGroup;
  hrCountryFilter: FormControl;
  bordersMap: FormControl;
  sourceSelector : FormControl;

  countriesList: any; //!todo


  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  breakpoint = 1;


  constructor(private breakpointObserver: BreakpointObserver,
    private prefService: HRCountryFilterPreferencesService,
) { }

  ngOnInit() {


    //1- CountryFilter
    let prefs = this.prefService.getDefaultValue();
    this.hrCountryFilter = new FormControl(prefs);
    //2- Map
    this.bordersMap = new FormControl(prefs);
    
    //3-Map selector
    this.sourceSelector = new FormControl(prefs.map.name);

    this.mainBorderForm = new FormGroup({
      hrCountryFilter: this.hrCountryFilter,
      bordersMap : this.bordersMap,
      hrSourceSelector : this.sourceSelector
    });
    this.hrCountryFilter.valueChanges.subscribe(filterValue => {
      this.bordersMap.setValue(filterValue);
      //Test to save prefs.
      if (filterValue && filterValue.population && filterValue.regionAndLanguage) {
        this.prefService.setValue(filterValue);
      }
    });
    this.sourceSelector.valueChanges.subscribe(data => {
      this.bordersMap.setValue(data);
    });
  }

  ngAfterViewInit() {
  }
}




