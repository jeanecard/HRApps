import { Component, OnInit, AfterViewInit } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import WKT from 'ol/format/WKT';
import GeoJSON from 'ol/format/GeoJSON';
import Circle from 'ol/geom/Circle';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';

import { fromLonLat } from 'ol/proj';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormGroup, FormControl } from '@angular/forms';
import { HRCountryFilterPreferencesService } from 'src/app/shared/hrcountry-filter-preferences.service';
import { HrBorderService } from 'src/app/shared/hr-border.service';

@Component({
  selector: 'app-main-countries',
  templateUrl: './main-countries.component.html',
  styleUrls: ['./main-countries.component.scss']
})
export class MainCountriesComponent implements OnInit, AfterViewInit {

  mainBorderForm: FormGroup;
  hrCountryFilter: FormControl;
  bordersMap: FormControl;

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

    this.mainBorderForm = new FormGroup({
      hrCountryFilter: this.hrCountryFilter,
      bordersMap : this.bordersMap
    });
    this.hrCountryFilter.valueChanges.subscribe(filterValue => {
      this.bordersMap.setValue(filterValue);
      //Test to save prefs.
      if (filterValue && filterValue.population && filterValue.regionAndLanguage) {
        this.prefService.setValue(filterValue);
      }
    });
  }

  ngAfterViewInit() {
  }
}




