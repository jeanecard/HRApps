import { Injectable } from '@angular/core';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import { Region } from '../model/region';
import { HrMapTheme } from '../model/hr-map-theme';

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

  public getGeometryStyles(geometryType: string, region: Region, theme : HrMapTheme): any {
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
            color: this.getColor(region, false, theme),
            width: 1,
          }),
          text: this.text
        })
      }
      case 'MultiLineString': {
        return new Style({
          stroke: new Stroke({
            color: this.getColor(region, false, theme),
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
            color: this.getColor(region, false, theme),
            width: 2
          }),
          fill: new Fill({
            color: this.getColor(region, true, theme),
          }),
          text: this.text
        })
      }
      case 'Polygon': {
        return new Style({
          stroke: new Stroke({
            color: this.getColor(region, false, theme),
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
            color: this.getColor(region, false, theme),
            width: 2
          }),
          fill: new Fill({
            color: this.getColor(region, false, theme)
          }),
          image: new CircleStyle({
            radius: 10,
            fill: null,
            stroke: new Stroke({
              color: this.getColor(region, false, theme)
            })
          }),
          text: this.text
        })
      }
      case 'Circle': {
        return new Style({
          stroke: new Stroke({
            color: this.getColor(region, false, theme),
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

  private getColor(region: Region, isForFill: boolean, theme : HrMapTheme): string {
    let defaultColor = 'rgba(0, 0, 210, 0.3)';
    let borderDefaultColor = 'rgb(210,210,210)';
    if(theme === HrMapTheme.Light){
      defaultColor = 'rgba(10, 10, 10, 0.1)';
      borderDefaultColor = 'gray';//'rgb(0,0,180)';
    }
    switch (region) {
      case Region.Africa: {
        if (!isForFill) {
          return borderDefaultColor;
        }
        else {
          return defaultColor;
        }
      }
      case Region.Americas: {
        if (!isForFill) {
          return borderDefaultColor;
        }
        else {
          return defaultColor;
        }

      }
      case Region.Asia: {
        if (!isForFill) {
          return borderDefaultColor;
        }
        else {
          return defaultColor;
        }
      }
      case Region.Europe: {
        if (!isForFill) {
          return borderDefaultColor;
        }
        else {
          return defaultColor;
        }
      }
      case Region.Oceania: {
        if (!isForFill) {
          return borderDefaultColor;
        } else {
          return defaultColor;
        }
      }
      default: {
        if (!isForFill) {
          return 'purple'
        } else {
          return defaultColor;
        }

      }
    }
  }
}

