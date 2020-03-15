import { Component, OnInit } from '@angular/core';

import 'ol/ol.css';
import {defaults as defaultInteractions} from 'ol/interaction';
import {Map, View} from 'ol/index';
import GeoJSON from 'ol/format/GeoJSON';
import {Modify, Select, Draw, Snap} from 'ol/interaction';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {useGeographic} from 'ol/proj';
import { TileDebug} from 'ol/source';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';

import XYZ from 'ol/source/XYZ';
import { ZoomSlider } from 'ol/control';
import WKT from 'ol/format/WKT';
import { defaults, DragPan } from 'ol/interaction';
import Circle from 'ol/geom/Circle';
import DoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import { OSM, Vector as VectorSource } from 'ol/source';
import { defaults as defaultControls, ZoomToExtent , ScaleLine} from 'ol/control';

import { fromLonLat } from 'ol/proj';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HrBorderService } from 'src/app/shared/hr-border.service';


@Component({
  selector: 'app-hrcountry-open-layer-map',
  templateUrl: './hrcountry-open-layer-map.component.html',
  styleUrls: ['./hrcountry-open-layer-map.component.scss']
})
export class HRCountryOpenLayerMapComponent implements OnInit {

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  image : CircleStyle;
  styles : any;
  geojsonObject : any;
  vectorSource : VectorSource;
  vectorLayer : VectorLayer;
  controls : any;
  feature : Feature;
  superLayer : TileLayer;

  constructor(private borderService: HrBorderService) { }

  ngOnInit() {
    this.image = new CircleStyle({
      radius: 5,
      fill: null,
      stroke: new Stroke({color: 'red', width: 1})
    });
    
    this.styles = {
      'Point': new Style({
        image: this.image
      }),
      'LineString': new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1
        })
      }),
      'MultiLineString': new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1
        })
      }),
      'MultiPoint': new Style({
        image: this.image
      }),
      'MultiPolygon': new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 1
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 200, 0.2)'
        })
      }),
      'Polygon': new Style({
        stroke: new Stroke({
          color: 'blue',
          lineDash: [4],
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)'
        })
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
        })
      }),
      'Circle': new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2
        }),
        fill: new Fill({
          color: 'rgba(255,0,0,0.2)'
        })
      })
    };
    
    this.borderService.getBorders().pipe(take(1)).subscribe(data => {
      //2- OpenLayer
      data.forEach(element => {
        var format = new WKT();
        var feature = format.readFeature(element.wkT_GEOMETRY, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        });
        feature.name = element.name;
        console.log('CCC');
        this.vectorSource.addFeature(feature);
        var vector = new VectorLayer({
          source: new VectorSource({
            features: [feature]
          })
        });
      });
    });

    //https://openlayers.org/en/latest/examples/vector-layer.html?q=geojson pour afficher le nom et faire le cliock...
    //Mais il manque la region.

    this.geojsonObject = {
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
      features: (new GeoJSON()).readFeatures(this.geojsonObject)
    });
    
  
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: (feature : any) : any => {return this.styles[feature.getGeometry().getType()];}
    });
    

    this.superLayer = new TileLayer({
      source: new XYZ({
        attributions: '',
        url: 'https://api.maptiler.com/maps/topographique/{z}/{x}/{y}.png?key=0U9Dg5h9puL9z2B1TmCu',
        maxZoom: 24
      })
    })

    this.map = new Map({
      layers: [
        // new TileLayer({
        //   source: new OSM()
        // }),
        this.superLayer,
        this.vectorLayer,
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
      interactions: defaultInteractions({
        onFocusOnly: false
      }),
      // controls: [
      //   new ScaleLine({className: 'ol-scale-line', target: document.getElementById('scale-line')})
      // ],
    });
    this.map.controls.push(new ScaleLine({className: 'ol-scale-line', target: document.getElementById('scale-line')}));

  }

}
