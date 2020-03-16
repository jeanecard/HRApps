import { Injectable } from '@angular/core';
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style';

@Injectable({
  providedIn: 'root'
})
export class OpenLayerStylesService {
  
  readonly imageOfPoint : CircleStyle;
  readonly text: Text;

  constructor() { 
    this.imageOfPoint = new CircleStyle({
      radius: 3,
      fill: null,
      stroke: new Stroke({color: 'blue', width: 1})
    });
    this.text = new Text({font: '12px Calibri,sans-serif', fill: new Fill({ color: '#000' }), stroke: new Stroke({ color: '#fff', width: 3})});
  }

  public geometryStyles() : any {
    return {
      'Point': new Style({
        image: this.imageOfPoint,
        text : this.text
      }),
      'LineString': new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
        }),
        text : this.text
      }),
      'MultiLineString': new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
          text : this.text
        }),
        text : this.text
      }),
      'MultiPoint': new Style({
        image: this.imageOfPoint,
        text : this.text
      }),
      'MultiPolygon': new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 1
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 200, 0.2)'
        }),
        text : this.text
      }),
      'Polygon': new Style({
        stroke: new Stroke({
          color: 'blue',
          lineDash: [4],
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)'
        }),
        text : this.text
      }),
      'GeometryCollection': new Style({
        stroke: new Stroke({
          color: 'magenta',
          width: 2
        }),
        fill: new Fill({
          color: 'magenta'
        }),
        image: new CircleStyle({
          radius: 10,
          fill: null,
          stroke: new Stroke({
            color: 'magenta'
          })
        }),
        text : this.text
      }),
      'Circle': new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2
        }),
        fill: new Fill({
          color: 'rgba(255,0,0,0.2)'
        }),
        text : this.text
      })
    };
  }
}

