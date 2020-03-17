import { Injectable } from '@angular/core';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import { Region } from '../model/region';

@Injectable({
  providedIn: 'root'
})
export class OpenLayerStylesService {

  readonly imageOfPoint: CircleStyle;
  readonly text: Text;

  constructor() {
    this.imageOfPoint = new CircleStyle({
      radius: 3,
      fill: null,
      stroke: new Stroke({ color: 'blue', width: 1 })
    });
    this.text = new Text({ font: '12px Calibri,sans-serif', fill: new Fill({ color: '#000' }), stroke: new Stroke({ color: '#fff', width: 3 }) });
  }

  public getGeometryStyles(geometryType: string, region: Region): any {
    switch (geometryType) {

      case 'Point': {
        return new Style({
          image: this.imageOfPoint,
          text: this.text
        })
      }
      case 'LineString': {
        return new Style({
          stroke: new Stroke({
            color: this.getColor(region, false),
            width: 1,
          }),
          text: this.text
        })
      }
      case 'MultiLineString': {
        return new Style({
          stroke: new Stroke({
            color: this.getColor(region, false),
            width: 1,
            text: this.text
          }),
          text: this.text
        })
      }
      case 'MultiPoint': {
        return new Style({
          image: this.imageOfPoint,
          text: this.text
        })
      }
      case 'MultiPolygon': {
        return new Style({
          stroke: new Stroke({
            color: this.getColor(region, false),
            width: 1
          }),
          fill: new Fill({
            color: this.getColor(region, true),
          }),
          text: this.text
        })
      }
      case 'Polygon': {
        return new Style({
          stroke: new Stroke({
            color: this.getColor(region, false),
            lineDash: [4],
            width: 3
          }),
          fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)'
          }),
          text: this.text
        })
      }
      case 'GeometryCollection': {
        return new Style({
          stroke: new Stroke({
            color: this.getColor(region, false),
            width: 2
          }),
          fill: new Fill({
            color: this.getColor(region, false)
          }),
          image: new CircleStyle({
            radius: 10,
            fill: null,
            stroke: new Stroke({
              color: this.getColor(region, false)
            })
          }),
          text: this.text
        })
      }
      case 'Circle': {
        return new Style({
          stroke: new Stroke({
            color: this.getColor(region, false),
            width: 2
          }),
          fill: new Fill({
            color: 'rgba(255,0,0,0.2)'
          }),
          text: this.text
        })
      }
      default: {
        return null;
      }
    }

  }

  private getColor(region: Region, isForFill: boolean): string {
    switch (region) {
      case Region.Africa: {
        if (!isForFill) {
          return 'rgb(50,50,50)';
        }
        else {
          return 'rgba(10, 10, 10, 0.1)';
        }
      }
      case Region.Americas: {
        if (!isForFill) {
          return 'rgb(50,50,50)';
        }
        else {
          return 'rgba(10, 10, 10, 0.1)';
        }

      }
      case Region.Asia: {
        if (!isForFill) {
          return 'rgb(50,50,50)';
        }
        else {
          return 'rgba(10, 10, 10, 0.1)';
        }
      }
      case Region.Europe: {
        if (!isForFill) {
          return 'rgb(50,50,50)';
        }
        else {
          return 'rgba(10, 10, 10, 0.1)';
        }
      }
      case Region.Oceania: {
        if (!isForFill) {
          return 'rgb(50,50,50)';
        } else {
          return 'rgba(10, 10, 10, 0.1)';
        }
      }
      default: {
        if (!isForFill) {
          return 'purple'
        } else {
          return 'rgba(10, 10, 10, 0.1)';
        }

      }
    }
  }
}

