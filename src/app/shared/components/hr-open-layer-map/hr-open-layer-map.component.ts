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
import {fromLonLat} from 'ol/proj';
import { defaults, DragPan, MouseWheelZoom } from 'ol/interaction';
import { platformModifierKeyOnly } from 'ol/events/condition';
import { Fill, Stroke, Style, Text } from 'ol/style';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MapLayerService } from '../../map-layer.service';
import Feature from 'ol/Feature';
import {Icon} from 'ol/style';
import {easeIn, easeOut} from 'ol/easing';
import Point from 'ol/geom/Point';

@Component({
  selector: 'app-hr-open-layer-map',
  templateUrl: './hr-open-layer-map.component.html',
  styleUrls: ['./hr-open-layer-map.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HrOpenLayerMapComponent),
      multi: true
    }]
})
export class HrOpenLayerMapComponent implements ControlValueAccessor, OnInit {

  public map: OlMap;
  public isWorking: boolean;
  public propagateChange = (_: any) => { };
  public propagateTouch = (_: any) => { };
  private mapView : View;

  private featureLocation = null;
  private locatorLayer = null;
  private locatorSource = null;


  constructor(private _layerService: MapLayerService) { }

  private createLayerLocator(val1, val2){
    this.featureLocation = new Feature({
      geometry: new Point(fromLonLat([val1, val2]))
    });
    
    
    this.featureLocation.setStyle(new Style({
      image: new Icon({
        color: 'white',
        crossOrigin: 'anonymous',
        imgSize: [30, 30],
        src: 'assets/icons/geolocator-icon.svg'
      })
    }));
 
    
    this.locatorSource = new VectorSource({
      features: [this.featureLocation]
    });
    
    this.locatorLayer = new VectorLayer({
      source: this.locatorSource
    });


  }

  private initMap(): void {

    this.createLayerLocator(0,0);



    this.mapView = new View({
      center: [0, 0],
      zoom: 2
    });
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
      layers: [this.locatorLayer],
      target: 'map',
      view: this.mapView,
    });
  }


  //ControlValueAccessor
  writeValue(value: any): void {
    if (value) {
      this.isWorking = true;
      if (this.map) {
        let querriedLayer = this._layerService.getSource(value);
        if (querriedLayer && querriedLayer.layer) {
          let mapLayers = this.map.getLayers();
          if (mapLayers) {
            mapLayers.clear();
            this.map.addLayer(querriedLayer.layer);
            this.map.addLayer(this.locatorLayer);
          }
        }
        this.map.changed();
      }
      if(value.center)
      {
        this.map.removeLayer(this.locatorLayer);
        this.createLayerLocator(value.center.lon, value.center.lat);
        this.map.addLayer(this.locatorLayer);
        this.map.changed();
  
        let target = fromLonLat([value.center.lon, value.center.lat]);
        //this.flyTo(target, function() {});
        this.mapView.animate({
        center:  fromLonLat([value.center.lon, value.center.lat]),
        duration: 3000,
      });
        }
      this.isWorking = false;
    }

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


  ngOnInit(): void {
    this.initMap();
  }
  
  public  flyTo(location, done) : void {
    var duration = 4000;
    let view = this.mapView;
    var zoom = view.getZoom();
    var parts = 4;
    var called = false;
    function callback(complete) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
        done(complete);
      }
    }
    view.animate({
      center: location,
      duration: duration
    }, callback);
    view.animate({
      zoom: zoom - 1,
      duration: duration /4
    }, {
      zoom: zoom,
      duration: duration / 4
    }, callback);
  }
}
