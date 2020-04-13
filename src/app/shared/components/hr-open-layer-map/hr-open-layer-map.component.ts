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


  constructor(private _layerService: MapLayerService) { }

  private initMap(): void {
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
      layers: [],
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
          }
        }
        this.map.changed();
      }
      if(value.center)
      {
        let target = fromLonLat([value.center.lon, value.center.lat]);
        this.flyTo(target, function() {});
      //   this.mapView.animate({
      //   center:  fromLonLat([value.center.lon, value.center.lat]),
      //   duration: 2000
      // });
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
    var duration = 10000;
    let view = this.mapView;
    var zoom = view.getZoom();
    var parts = 5;
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
      duration: duration / 5
    }, {
      zoom: zoom,
      duration: duration / 5
    }, callback);
  }
  public panto() : void{

    this.mapView.animate({
      center:  fromLonLat([2.68958, 43.5515]),
      duration: 2000
    });
  
  }
//lat: "43.5515"lng: "2.68958" 
}
