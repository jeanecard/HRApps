import { Component, OnInit, AfterViewInit } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';

import { fromLonLat } from 'ol/proj';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormGroup, FormControl } from '@angular/forms';
import { HRCountryFilterPreferencesService } from 'src/app/shared/hrcountry-filter-preferences.service';

@Component({
  selector: 'app-main-countries',
  templateUrl: './main-countries.component.html',
  styleUrls: ['./main-countries.component.scss']
})
export class MainCountriesComponent implements OnInit, AfterViewInit {
  
  mainBorderForm : FormGroup;
  hrCountryFilter: FormControl;

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  breakpoint = 1;
  constructor(private breakpointObserver: BreakpointObserver,
    private prefService : HRCountryFilterPreferencesService) { }

  ngOnInit() {
    //1- CountryFilter
    let prefs = this.prefService.getDefaultValue();
    this.hrCountryFilter = new FormControl(prefs);

    this.mainBorderForm = new FormGroup({
      hrCountryFilter: this.hrCountryFilter
    });
    this.hrCountryFilter.valueChanges.subscribe(filterValue => {

      //Test to save prefs.
      if(filterValue && filterValue.population && filterValue.regionAndLanguage){
        this.prefService.setValue(filterValue);
      }
    });
    //2- OpenLayer
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([6.661594, 50.433237]),
      zoom: 3
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
  }

  ngAfterViewInit() {
    this.map.setTarget('map');
  }
}
