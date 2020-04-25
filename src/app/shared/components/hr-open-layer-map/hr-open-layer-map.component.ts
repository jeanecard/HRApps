import { Component, OnInit, forwardRef } from '@angular/core';

import Circle from 'ol/geom/Circle';
import 'ol/ol.css';
import { Map, View } from 'ol/index';
import {  Vector as VectorLayer } from 'ol/layer';
import OlMap from 'ol/Map';
import 'ol/ol.css';
import { Vector as VectorSource } from 'ol/source';
import {ScaleLine } from 'ol/control';
import { fromLonLat, toLonLat } from 'ol/proj';
import { defaults, DragPan, MouseWheelZoom, Translate } from 'ol/interaction';
import { platformModifierKeyOnly } from 'ol/events/condition';
import { Style} from 'ol/style';
import Select from 'ol/interaction/Select';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MapLayerService } from '../../map-layer.service';
import Feature from 'ol/Feature';
import { Icon } from 'ol/style';
import Point from 'ol/geom/Point';
import { HRWebCamService } from '../../hrweb-cam.service';
import { Subscription } from 'rxjs';
import { HRGeoLocatorOpenLayerModel } from 'src/app/model/hrgeo-locator-open-layer-model';
import { RangeModel } from 'src/app/model/range-model';

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
  private mapView: View;

  private featureLocation = null;
  private locatorLayer = null;
  private webCamLayer = null;
  private areaWebCamLayer = null;
  private locatorSource = null;
  private webCamSource = null;
  private areaWebCamSource = null;
  private webCamSubscription: Subscription;
  private selectSingleClick: Select;
  private model: HRGeoLocatorOpenLayerModel = null;
  private static FEATURE_LOCATION_ID = "privateID";
  private static ANIMATION_LOCATOR_DURATION = 2000;
  private static LOCATOR_STYLE = new Style({
    image: new Icon({
      color: 'white',
      crossOrigin: 'anonymous',
      imgSize: [30, 30],
      src: 'assets/icons//geoLocation.png'
    })
  });
  private static WEBCAM_STYLE = new Style({
    image: new Icon({
      color: 'white',
      crossOrigin: 'anonymous',
      src: 'assets/icons/webcam.png'
    })
  });
  private static LOCATOR_LAYER_INDEX = 10;
  public static WEBCAM_FEATURE_PROPERTY_NAME = "WebCam";

  constructor(private _layerService: MapLayerService, private _webCamService: HRWebCamService) { }

  private createLayeWebCam() {
    //1- création du Layer Area.
    this.createLayerArea(this.model.mapCenterLon, this.model.mapCenterLat);
   if(this.webCamSubscription){
     this.webCamSubscription.unsubscribe();
   }
   if (this.model.range.display) {
    this.webCamSubscription = this._webCamService.getNearestWebcams(this.model.mapCenterLat, this.model.mapCenterLon, this.model.range.range).subscribe(data => {
      
      let webCamItems = null;
      if(data && data.result){
          webCamItems = data.result.webcams;
      }
      let webCamfeatures = [];
      let latDelta = 0.001;
      let lonDelta = 0.001;
      if(webCamItems){
        
        webCamItems.forEach(element => {
          console.log("WAHOU ");

          let lonConverted = element.location.longitude;
          let latConverted = element.location.latitude;

          console.log(latConverted);
          console.log(lonConverted);
          let webCamFeaturei = new Feature({
            geometry: new Point(fromLonLat([lonConverted, latConverted]))
          });
          webCamFeaturei.set(HrOpenLayerMapComponent.WEBCAM_FEATURE_PROPERTY_NAME, element, true);
          webCamFeaturei.setStyle(HrOpenLayerMapComponent.WEBCAM_STYLE);
          webCamfeatures.push(webCamFeaturei);
        });
    
      }
  
      this.webCamSource = new VectorSource({
        features: webCamfeatures
      });
  
      this.webCamLayer = new VectorLayer({
        source: this.webCamSource,
        zIndex: 9
      });
    })
   } else{
    this.webCamSource = new VectorSource({
      features: []
    });

    this.webCamLayer = new VectorLayer({
      source: this.webCamSource,
      zIndex: 9
    });
   }
    
  
  }

  private createLayerArea(lon : number, lat : number) : void{
    let areaFeatures = [];
    if (this.model.range.display) {
      let circleFeature = new Feature({
        geometry: new Circle(fromLonLat([lon, lat]), 1100 * this.model.range.range, 'XY')
      });
      areaFeatures.push(circleFeature);
    }
    this.areaWebCamSource = new VectorSource({
      features: areaFeatures
    });
    this.areaWebCamLayer = new VectorLayer({
      source: this.areaWebCamSource
    });
  }

  private createLayerLocator() {
    let features = [];
    this.featureLocation = new Feature({
      geometry: new Point(fromLonLat([this.model.mapCenterLon, this.model.mapCenterLat])),
    });
    this.featureLocation.setId(HrOpenLayerMapComponent.FEATURE_LOCATION_ID);
    features.push(this.featureLocation);
    this.featureLocation.setStyle(HrOpenLayerMapComponent.LOCATOR_STYLE);
    this.locatorSource = new VectorSource({
      features: features
    });
    this.locatorLayer = new VectorLayer({
      source: this.locatorSource,
      zIndex: HrOpenLayerMapComponent.LOCATOR_LAYER_INDEX
    });
  }

  private instanciateEmptyMap(): void {

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

    var scaleline = new ScaleLine();
    this.map.addControl(scaleline);
  }

  //ControlValueAccessor
  public writeValue(value: HRGeoLocatorOpenLayerModel): void {
    if (value) {
      let updateMap = false;
      //1- instanciation du model à partir de la valeur initiale si le model interne est null
      if (this.model === null) {
        this.initModelFrom(value);
        this.intializeMap();
        updateMap = true;
      }
      //2- Sinon, il s'agit d'un patch value
      else {
        //2.1- mise à jour du fond de carte
        if (value.map != undefined && value.map !== null
          && this.model.map != value.map) {
          this.changeMap(value.map);
          updateMap = true;
        }
        //2.2- Mise à jour du locator
        else if (value.mapCenterLat != undefined && value.mapCenterLat !== NaN
          && value.mapCenterLon != undefined && value.mapCenterLon !== NaN
          && value.mapCenterLat !== this.model.mapCenterLat
          && value.mapCenterLon !== this.model.mapCenterLon) {
          this.changeLocator(value.mapCenterLon, value.mapCenterLat);
          updateMap = true;
        }
        //2.3- Mise à jour du Range des webCams
        else if (value.range != undefined && value.range != null) {
          updateMap = this.changeRange(value.range);
        }
      }
      //3- Refresh of carto.
      if (updateMap) {
        this.map.changed();
      }
    }
  }

  private intializeMap(): void {
    if (this.map) {
      let querriedLayer = this._layerService.getSource(this.model.map);
      if (querriedLayer && querriedLayer.layer) {
        this.createLayerLocator();
        this.createLayeWebCam();
        this.map.addLayer(querriedLayer.layer);
        this.map.addLayer(this.locatorLayer);
        this.map.addLayer(this.webCamLayer);
        this.map.addLayer(this.areaWebCamLayer);
      }
    }
  }

  private changeMap(mapName: string): void {
    this.model.map = mapName;
    if (this.map) {
      let querriedLayer = this._layerService.getSource(mapName);
      if (querriedLayer && querriedLayer.layer) {
        let mapLayers = this.map.getLayers();
        if (mapLayers) {
          mapLayers.clear();
        }
        this.map.addLayer(querriedLayer.layer);
        this.map.addLayer(this.locatorLayer);
        this.map.addLayer(this.webCamLayer);
        this.map.addLayer(this.areaWebCamLayer);
      }
    }
  }

  private changeLocator(lon: number, lat: number): void {
    this.isWorking = true;
    this.model.mapCenterLat = lat;
    this.model.mapCenterLon = lon;
    this.map.removeLayer(this.locatorLayer);
    this.map.removeLayer(this.webCamLayer);
    this.map.removeLayer(this.areaWebCamLayer);
    if (this.webCamSubscription) {
      this.webCamSubscription.unsubscribe();
    }
    this.webCamSubscription = this._webCamService.getNearestWebcams(this.model.mapCenterLat, this.model.mapCenterLon, 10000).subscribe(data => {
      this.createLayerLocator();
      this.map.removeLayer(this.webCamLayer);
      this.map.removeLayer(this.areaWebCamLayer);
      this.map.removeLayer(this.locatorLayer);
      this.createLayeWebCam();
      this.map.addLayer(this.locatorLayer);
      this.map.addLayer(this.webCamLayer);
      this.map.addLayer(this.areaWebCamLayer);
      this.isWorking = false;


      let target = fromLonLat([this.model.mapCenterLon, this.model.mapCenterLat]);
      this.mapView.animate({
        center: fromLonLat([this.model.mapCenterLon, this.model.mapCenterLat]),
        duration: HrOpenLayerMapComponent.ANIMATION_LOCATOR_DURATION,
      });
    });
  }

  private changeRange(rangeToSet : RangeModel) : boolean{
    if (rangeToSet.display) {
      if (this.model.range.display !== rangeToSet.display
        || this.model.range.range !== rangeToSet.range) {
        this.model.range.display = true;
        this.model.range.range = rangeToSet.range;
        this.map.removeLayer(this.webCamLayer);
        this.map.removeLayer(this.areaWebCamLayer);
        this.createLayeWebCam();
        this.map.addLayer(this.webCamLayer);
        this.map.addLayer(this.areaWebCamLayer);
        return true;
      }
    } else {
      if (this.model.range.display !== rangeToSet.display) {
        this.model.range.display = false;
        this.map.removeLayer(this.webCamLayer);
        this.map.removeLayer(this.areaWebCamLayer);
        return true;
      }
    }
    return false;
  }

  private initModelFrom(value: HRGeoLocatorOpenLayerModel): void {
    //TODO a blinder bien sur.
    this.model = new HRGeoLocatorOpenLayerModel();
    this.model.map = value.map;
    this.model.mapCenterLat = value.mapCenterLat;
    this.model.mapCenterLon = value.mapCenterLon;
    this.model.range = new RangeModel();
    this.model.range.range = value.range.range;
    this.model.range.max = value.range.max,
      this.model.range.min = value.range.min,
      this.model.range.display = value.range.display;

    //TODO Cheat Le soulié :-)
    this.model.mapCenterLat = 43.5514;
    this.model.mapCenterLon = 2.6895;

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
    //Dummy for the moment.
  }


  private processSelectedFeature(event: any): void {
    event.target.getFeatures().forEach(element => {
      if (element.getId() !== HrOpenLayerMapComponent.FEATURE_LOCATION_ID) {
        this.propagateChange({ webcam: element.get("WebCam") });
      }
    });
  }

  ngOnInit(): void {
    //Disponibles a la selection : Locator et les WebCams
    this.selectSingleClick = new Select({
      layers: (data) => {
        return (data === this.locatorLayer || data === this.webCamLayer)
      }
    });
    //Disponible à la modification sur la carto. : Locator
    var translate = new Translate({
      layers: (data) => {
        return (data === this.locatorLayer)
      },
      features: this.selectSingleClick.getFeatures()
    });
    //Creation de la carto vide
    this.instanciateEmptyMap();
    //Branchement des interactions
    this.map.addInteraction(this.selectSingleClick);
    this.map.addInteraction(translate);
    //Branchement de la selection
    this.selectSingleClick.on('select', (event) => {
      this.processSelectedFeature(event);
    });


    translate.on('translateend', (event) => {
      let coord = toLonLat(event.coordinate);
      let coordinates = toLonLat([coord[0], coord[1]], 'EPSG:4326');
      this.writeValue({
        map : undefined,
        mapCenterLat : coordinates[1],
        mapCenterLon : coordinates[0],
        range : undefined
      });
    });
  }
}
