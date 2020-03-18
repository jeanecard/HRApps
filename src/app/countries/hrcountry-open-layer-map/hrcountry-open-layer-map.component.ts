import { Component, OnInit, forwardRef } from '@angular/core';

import 'ol/ol.css';
import {Map, View} from 'ol/index';
import GeoJSON from 'ol/format/GeoJSON';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OlMap from 'ol/Map';
import 'ol/ol.css';
import XYZ from 'ol/source/XYZ';
import WKT from 'ol/format/WKT';
import { OSM, Vector as VectorSource } from 'ol/source';
import { defaults as defaultControls, ZoomToExtent , ScaleLine} from 'ol/control';
import {defaults, DragPan, MouseWheelZoom} from 'ol/interaction';
import {platformModifierKeyOnly} from 'ol/events/condition';

import MousePosition from 'ol/control/MousePosition';
import {toStringXY} from 'ol/coordinate';

import {Fill, Stroke, Style, Text} from 'ol/style';

import { take } from 'rxjs/operators';

import { HrBorderService } from 'src/app/shared/hr-border.service';
import { OpenLayerStylesService } from 'src/app/shared/open-layer-styles.service';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Language } from 'src/app/model/language';
import { Region } from 'src/app/model/region';
import { PopulationFilterModel } from 'src/app/model/population-filter-model';
import { Observable } from 'rxjs';
import { HrBorder } from 'src/app/model/hr-border';
import { FlagDetailComponent } from 'src/app/flags/flag-detail/flag-detail.component';
import { HRCountry } from 'src/app/model/hrcountry';
import { Variable } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-hrcountry-open-layer-map',
  templateUrl: './hrcountry-open-layer-map.component.html',
  styleUrls: ['./hrcountry-open-layer-map.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HRCountryOpenLayerMapComponent),
      multi: true
    }
  ]
})
export class HRCountryOpenLayerMapComponent implements ControlValueAccessor,  OnInit {

  map: OlMap;
  geometryStyles : any;
  baseGeojsonObject : any;
  vectorSource : VectorSource;
  vectorLayer : VectorLayer;
  cartographyLayer : TileLayer;
  borders :  Observable<HrBorder[]>;
  sourceTiler : any;


  constructor(private borderService: HrBorderService,
    private layerStylesService : OpenLayerStylesService) { }


  ngOnInit(): void {

    //1- Préparation de la source des Features Geo et du Layer d'affichage
    this.baseGeojsonObject = {
      'type': 'FeatureCollection',
      'crs': {
        'type': 'name',
        'properties': {
          'name': 'EPSG:3857'
        }
      },
      'features': [{
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [0, 0]
        }
      }]
    };
    
    this.vectorSource = new VectorSource({
      features: (new GeoJSON()).readFeatures(this.baseGeojsonObject)
    });
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: (feature : any) : any => {
        let correspondingStyle = this.layerStylesService.getGeometryStyles(feature.getGeometry().getType(), feature.borderRegion);
        correspondingStyle.getText().setText(feature.name);
        return correspondingStyle;
      }
    });


  
    //https://openlayers.org/en/latest/examples/vector-layer.html?q=geojson pour afficher le nom et faire le cliock...
    //Mais il manque la region.

    //3- Construction du Layer cartographique et fourniture de sa source (ici maptiler)
    this.sourceTiler = new XYZ({
      attributions: '',
      url: 'https://api.maptiler.com/maps/topographique/{z}/{x}/{y}.png?key=0U9Dg5h9puL9z2B1TmCu',
      maxZoom: 24
    });

    this.cartographyLayer = new TileLayer({
      source: this.sourceTiler
    });

    //4- Construction de la map avec les deux layers précedents et une vue centrée en 0.0
    this.map = new Map({
      interactions: defaults({dragPan: false, mouseWheelZoom: false}).extend([
        new DragPan({
          condition: function(event) {
            return this.getPointerCount() === 2 || platformModifierKeyOnly(event);
          }
        }),
        new MouseWheelZoom({
          condition: platformModifierKeyOnly
        })
      ]),
      layers: [
        this.cartographyLayer,
        this.vectorLayer,
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
    });

    this.map.selectedFeatureName = '';

    //5- Ajout des controls
    //5.1- Ajout d'une ScaleLine en haut à gauche
    this.map.controls.push(new ScaleLine({className: 'ol-scale-line', target: document.getElementById('scale-line')}));

    //5.2 Ajout des corrdinates en visu.
    // this.map.controls.push(new MousePosition({
    //   className: 'mouse-pointer', 
    //   target: document.getElementById('mouse-pointer'),
    //   coordinateFormat : (data) => {return toStringXY(data, 1)}}));

    //6- Selection des Features
    
    var highlightStyle = new Style({
      stroke: new Stroke({
        color: 'white',//'#f00',
        width: 3
      }),
      fill: new Fill({
        color: 'rgba(255,0,0,0.1)'
      }),
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: '#000'
        }),
        stroke: new Stroke({
          color: '#f00',
          width: 3
        })
      })
    });
    
    var featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: this.map,
      style: function(feature) {
        highlightStyle.getText().setText(feature.get('name'));
        return highlightStyle;
      }
    });
    
    var highlight;
    var displayFeatureInfo = function(pixel, map) {
    
      var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
        return feature;
      });
    
      var info = document.getElementById('info');
      if (feature) {
        map.selectedFeatureName = feature.name;
        //info.innerHTML = feature.name;
      } else {
        //info.innerHTML = '&nbsp;';
        map.selectedFeatureName = '';
      }
    
      if (feature !== highlight) {
        if (highlight) {
          featureOverlay.getSource().removeFeature(highlight);
        }
        if (feature) {
          featureOverlay.getSource().addFeature(feature);
        }
        highlight = feature;
      }
    
    };
    
    this.map.on('pointermove', function(evt) {
      if (evt.dragging) {
        return;
      }
      var pixel = evt.map.getEventPixel(evt.originalEvent);
      displayFeatureInfo(pixel, evt.map);
    });
    

    

    this.map.on('click', function(evt) {
      // console.log(evt);
      // evt.map.openDialog('fr');
    });
    //--------------
  }
  //Control value accessor

  propagateChange = (_: any) => { };
  propagateTouch = (_: any) => { };
  isWorking: boolean;

  writeValue(value: any): void {

    this.isWorking = true;
    if (value) {
      let lang: Language;
      if (value.regionAndLanguage) {
        lang = {
          iso639_1: value.regionAndLanguage.language,
          iso639_2: '',
          name: '',
          nativeName: ''
        };
      }
      let region: any;
      if (value.regionAndLanguage) {
        region = value.regionAndLanguage.region;
      }
      let pop: PopulationFilterModel;
      if (value.population) {
        pop = {
          amount: value.population.amount,
          over: value.population.over
        }
      }
      
      this.borders = this.borderService.getBorders(region, lang, pop);

      this.isWorking = true;
      this.borders.pipe(take(1)).subscribe(data => {
        this.vectorSource.clear();
        //2- OpenLayer
        let features = [];
        data.forEach(element => {
          var format = new WKT();
          var feature = format.readFeature(element.wkT_GEOMETRY, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
          });
          //!Cheat
          feature.name = element.name;
          feature.borderRegion = Region[element.borderRegion];
          features.push(feature);
        });
        this.vectorSource.addFeatures(features);
        this.map.getLayerGroup().getLayers().item(1).setSource(this.vectorSource);
        this.map.changed();
        this.isWorking = false;
        this.propagateChange({ countriesCount: data.length });
      }, error => {
        this.isWorking = false;
      }, () => {
        this.isWorking = false;
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
    //Dummy.
  }

  public isFeatureInfoDisplayed () : boolean {
    return this.map.selectedFeatureName !== '';
  }
}