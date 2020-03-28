import { Component, OnInit, forwardRef } from '@angular/core';

import 'ol/ol.css';
import { Map, View } from 'ol/index';
import GeoJSON from 'ol/format/GeoJSON';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OlMap from 'ol/Map';
import 'ol/ol.css';
import WKT from 'ol/format/WKT';
import { Vector as VectorSource } from 'ol/source';
import { defaults as defaultControls, ScaleLine } from 'ol/control';
import { defaults, DragPan, MouseWheelZoom } from 'ol/interaction';
import { platformModifierKeyOnly } from 'ol/events/condition';
import { Fill, Stroke, Style, Text } from 'ol/style';

import { take } from 'rxjs/operators';

import("../../model/hr-map-theme")
import { HrBorderService } from 'src/app/shared/hr-border.service';
import { OpenLayerStylesService } from 'src/app/shared/open-layer-styles.service';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Language } from 'src/app/model/language';
import { Region } from 'src/app/model/region';
import { PopulationFilterModel } from 'src/app/model/population-filter-model';
import { Observable } from 'rxjs';
import { HrBorder } from 'src/app/model/hr-border';
import { HrMapTheme } from 'src/app/model/hr-map-theme';
import { MapLayerService } from 'src/app/shared/map-layer.service';


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
export class HRCountryOpenLayerMapComponent implements ControlValueAccessor, OnInit {

  public map: OlMap;
  public isWorking: boolean;
  public propagateChange = (_: any) => { };
  public propagateTouch = (_: any) => { };


  private readonly _baseGeojsonObject: any;
  private _vectorSource: VectorSource;
  private _vectorLayer: VectorLayer;
  private _borders: Observable<HrBorder[]>;
  private _theme = HrMapTheme.Dark; //default.


  constructor(private _borderService: HrBorderService,
    private _layerStylesService: OpenLayerStylesService,
    private _layerService: MapLayerService) {
    //1- Préparation de la source des Features Geo et du Layer d'affichage
    this._baseGeojsonObject = {
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
  }

  /**
   * @description
   * Init the component.
   * @returns void
   * @usageNotes
   */
  ngOnInit(): void {
    this._vectorSource = new VectorSource({
      features: (new GeoJSON()).readFeatures(this._baseGeojsonObject)
    });
    this._vectorLayer = new VectorLayer({
      source: this._vectorSource,
      style: (feature: any): any => {
        let correspondingStyle = this._layerStylesService.getGeometryStyles(feature.getGeometry().getType(), feature.borderRegion, this.getTheme());
        correspondingStyle.getText().setText(feature.name);
        return correspondingStyle;
      }
    });
    //4- Construction de la map avec les deux layers précedents et une vue centrée en 0.0
    this.createMap();
    //6- Selection des Features
    this.addBordersFeatureOnMap();
  }

  /**
 * @description
 * Get the Map Theme.
 * @returns HrMapTheme
 * @usageNotes
 */
  private getTheme(): HrMapTheme {
    return this._theme;
  }

  /**
   * @description
   * Writes a new value to the element.
   *
   * This method is called by the forms API to write to the view when programmatic
   * changes from model to view are requested.
   *
   * @param  value is a HRBorderFilterModel.
   * @returns void
   * @usageNotes
   * writeValue(aHRBorderFilterModel);
   * ### Write a value to the element
   */
  public writeValue(value: any): void {
    let processBorders = false;
    if (value) {
      if (value.countryFilter) {
        let lang: Language;
        if (value.countryFilter.regionAndLanguage) {
          processBorders = true;
          lang = {
            iso639_1: value.countryFilter.regionAndLanguage.language,
            iso639_2: '',
            name: '',
            nativeName: ''
          };
        }
        let region: any;
        if (value.countryFilter.regionAndLanguage) {
          region = value.countryFilter.regionAndLanguage.region;
        }
        let pop: PopulationFilterModel;
        if (value.countryFilter.population) {
          processBorders = true;
          pop = {
            amount: value.countryFilter.population.amount,
            over: value.countryFilter.population.over
          }
        }
        if (processBorders) {
          this.writeBorder(region, lang, pop);
        }
      }
      if (value.map) {
        this.writeMap(value.map);
      }
    }
  }

  private writeBorder(region: any, lang: any, pop: any): void {
    this.isWorking = true;
    this._borders = this._borderService.getBorders(region, lang, pop);
    this._borders.pipe(take(1)).subscribe(data => {
      this._vectorSource.clear();
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
      this._vectorSource.addFeatures(features);
      this.isWorking = false;
      this.propagateChange({ countriesCount: data.length });
    }, error => {
      this.isWorking = false;
    }, () => {
      this.isWorking = false;
    });
  }

  private writeMap(value: any): void {
    this.isWorking = true;
    if (this.map && this._layerService) {
      let querriedLayer = this._layerService.getSource(value);
      if (querriedLayer && querriedLayer.layer && this._vectorLayer) {
        this._theme = querriedLayer.theme;
        let mapLayers = this.map.getLayers();
        if (mapLayers) {
          mapLayers.clear();
          this.map.addLayer(querriedLayer.layer);
          mapLayers.push(this._vectorLayer);
          this._vectorLayer.setStyle((feature: any): any => {
            if (feature) {
              let correspondingStyle = this._layerStylesService.getGeometryStyles(feature.getGeometry().getType(), feature.borderRegion, this.getTheme());
              if (correspondingStyle) {
                correspondingStyle.getText().setText(feature.name);
                return correspondingStyle;
              }
            }
            return null;
          });
        }
      }
      this.map.changed();
    }
    this.isWorking = false;
  }
  /**
 * @description
 * Register the function to call when OnChange propagation is needed.
 *
 */
  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  /**
 * @description
 * Register the function to call when OnTouched propagation is needed.
 *
 */
  public registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
  /**
    * @description
    * Function that is called by the forms API when the control status changes to
    * or from 'DISABLED'. Depending on the status, it enables or disables the
    * appropriate DOM element.
    * @param isDisabled The disabled status to set on the element
    */
  setDisabledState?(isDisabled: boolean): void {
    //Dummy.
  }

  /**
 * @description
 * Return true if a Feature is selected.
 *
 * This method is called by the view
 *
 * @returns boolean
 */
  public isFeatureInfoDisplayed(): boolean {
    return this.map.selectedFeatureName !== '';
  }

  /**
   * @description
   * Create the OpenLayer map.
   */
  private createMap(): void {
    this.map = new Map({
      interactions: defaults({ dragPan: false, mouseWheelZoom: false }).extend([
        new DragPan({
          condition: function (event) {
            return this.getPointerCount() === 2 || platformModifierKeyOnly(event);
          }
        }),
        new MouseWheelZoom({
          condition: platformModifierKeyOnly
        })
      ]),
      layers: [],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
    });

    this.map.selectedFeatureName = '';

    //5- Ajout des controls
    //5.1- Ajout d'une ScaleLine en haut à gauche
    this.map.controls.push(new ScaleLine({ className: 'ol-scale-line', target: document.getElementById('scale-line') }));
    this.map.changed();
  }
  /**
   * @description
   * This method instanciate aall openLayers Controls ans Interactions ... too big //!TODO factorise.
   */
  private addBordersFeatureOnMap() {
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
      style: function (feature) {
        highlightStyle.getText().setText(feature.get('name'));
        return highlightStyle;
      }
    });

    var highlight;
    var displayFeatureInfo = function (pixel, map) {

      var feature = map.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
      });

      var info = document.getElementById('info');
      if (feature) {
        map.selectedFeatureName = feature.name;
      } else {
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

    this.map.on('pointermove', function (evt) {
      if (evt.dragging) {
        return;
      }
      var pixel = evt.map.getEventPixel(evt.originalEvent);
      displayFeatureInfo(pixel, evt.map);
    });




    this.map.on('click', function (evt) {
      var pixel = evt.map.getEventPixel(evt.originalEvent);
      displayFeatureInfo(pixel, evt.map);
    });
  }
}
    //https://openlayers.org/en/latest/examples/vector-layer.html?q=geojson pour afficher le nom et faire le cliock...
    //Mais il manque la region.
