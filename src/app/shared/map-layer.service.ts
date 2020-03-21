import { Injectable } from '@angular/core';
import { SourceMapModel } from '../model/source-map-model';
import { HrMapTheme } from '../model/hr-map-theme';

import XYZ from 'ol/source/XYZ';
import Layer from 'ol/layer/Layer';
import { Tile as TileLayer } from 'ol/layer';
import TileJSON from 'ol/source/TileJSON';

@Injectable({
  providedIn: 'root'
})
export class MapLayerService {

  private readonly TOPO_LAYER_NAME = 'Topography';
  private readonly SAT_LAYER_NAME = 'Satellite';

  constructor() { }

  getSources(): SourceMapModel[] {
    return [
      { name: this.TOPO_LAYER_NAME, layer: this.getLayer(this.TOPO_LAYER_NAME), theme: HrMapTheme.Light },
      { name: this.SAT_LAYER_NAME, layer: this.getLayer(this.SAT_LAYER_NAME), theme: HrMapTheme.Dark },
      //{name : 'IGN', url : '', maxZoom : 24, theme : HrMapTheme.Light} //Coming soon
    ]
  }
  getDefaultSource(): SourceMapModel {
    return this.getSources()[0];
  };

  getSource(name: string): SourceMapModel {

    let sources = this.getSources();

    if (sources) {
      let sourcesCount = sources.length;
      for (let i = 0; i < sourcesCount; i++) {
        if (sources[i] && sources[i].name === name) {
          return sources[i];
        }
      }
    }
    return null;
  }

  private getLayer(name: string): Layer {
    if (name === this.SAT_LAYER_NAME) {
      let source = new TileJSON({
        url: 'https://api.maptiler.com/maps/hybrid/tiles.json?key=0U9Dg5h9puL9z2B1TmCu',
        tileSize: 512,
        crossOrigin: 'anonymous'
      });
      return new TileLayer({
        source: source
      })
    } else if (name == this.TOPO_LAYER_NAME) {
      let sourceTiler = new XYZ({
        attributions: '',
        url: 'https://api.maptiler.com/maps/topographique/{z}/{x}/{y}.png?key=0U9Dg5h9puL9z2B1TmCu',
        maxZoom: 24
      });
      return new TileLayer({
        source: sourceTiler
      });
    }
    return null;
  }

}
