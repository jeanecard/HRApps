import { Component, OnInit, AfterViewInit } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';

import { fromLonLat } from 'ol/proj';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Language } from 'src/app/model/language';
import { Region } from 'src/app/model/region';
import { PopulationFilterModel } from 'src/app/model/population-filter-model';

@Component({
  selector: 'app-main-countries',
  templateUrl: './main-countries.component.html',
  styleUrls: ['./main-countries.component.scss']
})
export class MainCountriesComponent implements OnInit, AfterViewInit {

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  breakpoint = 1;

  language: Language = null;
  region: Region = Region.All;
  population: PopulationFilterModel = null;
  countriesList: Array<any>[] = new Array<any>();

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
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

  onLanguageChanged(languageEvent: Language) {
    this.language = languageEvent;
    // this.populateCards(this.region, this.language, this.population);
  }

  onPopulationChanged(populationEvent: PopulationFilterModel) {
    this.population = populationEvent;
    // this.populateCards(this.region, this.language, this.population);
  }

  onRegionChanged(regionEvent: Region) {
    this.region = regionEvent;

    // this.populateCards(this.region, this.language, this.population);
  }
}
