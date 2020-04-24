import { Component, OnInit, forwardRef } from '@angular/core';

import Circle from 'ol/geom/Circle';
import 'ol/ol.css';
import transform from 'ol/transform';
import { Map, View } from 'ol/index';
import GeoJSON from 'ol/format/GeoJSON';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OlMap from 'ol/Map';
import 'ol/ol.css';
import WKT from 'ol/format/WKT';
import { Vector as VectorSource } from 'ol/source';
import { defaults as defaultControls, ScaleLine } from 'ol/control';
import { fromLonLat, toLonLat } from 'ol/proj';
import { defaults, DragPan, MouseWheelZoom, Translate, Modify } from 'ol/interaction';
import { platformModifierKeyOnly } from 'ol/events/condition';
import { Fill, Stroke, Style, Text } from 'ol/style';
import Select from 'ol/interaction/Select';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MapLayerService } from '../../map-layer.service';
import Feature from 'ol/Feature';
import { Icon } from 'ol/style';
import { easeIn, easeOut } from 'ol/easing';
import Point from 'ol/geom/Point';
import * as olCoordinate from 'ol/coordinate';
import { HRWebCamService } from '../../hrweb-cam.service';
import { Subscription } from 'rxjs';
import { WebCamItemModel } from 'src/app/model/web-cam-model';


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


  private range = 1;
  private displayWebCam: boolean;
  private geolocationLat: number;
  private geolocationLon: number;
  private webCamSubscription: Subscription;
  private selectSingleClick: Select;



  constructor(private _layerService: MapLayerService, private _webCamService: HRWebCamService) { }


  private createLayeWebCam(val1, val2) {

    let areaFeatures = [];

    let circleFeature = new Feature({
      geometry: new Circle(fromLonLat([val1, val2]), 1100 * this.range, 'XY')
    });
    areaFeatures.push(circleFeature);
    this.areaWebCamSource = new VectorSource({
      features: areaFeatures
    });

    this.areaWebCamLayer = new VectorLayer({
      source: this.areaWebCamSource
    });

    let webCamfeatures = [];

    let lonConverted = Number(val1);
    let latConverted = Number(val2);
    lonConverted = lonConverted + 0.001;
    latConverted = latConverted + 0.001;

    let webcams = this.getStubbedwebCams();
    let webCamFeature1 = new Feature({
      geometry: new Point(fromLonLat([lonConverted, latConverted]))
    });
    webCamFeature1.set("WebCam", webcams[0], true);

    webCamfeatures.push(webCamFeature1);

    webCamFeature1.setStyle(new Style({
      image: new Icon({
        color: 'white',
        crossOrigin: 'anonymous',
        src: 'assets/icons/webcam.png'
      })
    }));

    lonConverted = lonConverted - 0.002;
    latConverted = latConverted + 0.001;
    let webCamFeature2 = new Feature({
      geometry: new Point(fromLonLat([lonConverted, latConverted]))
    });
    webCamFeature2.set("WebCam", webcams[1], true);

    webCamfeatures.push(webCamFeature2);

    webCamFeature2.setStyle(new Style({
      image: new Icon({
        color: 'white',
        crossOrigin: 'anonymous',
        src: 'assets/icons/webcam.png'
      })
    }));


    this.webCamSource = new VectorSource({
      features: webCamfeatures
    });

    this.webCamLayer = new VectorLayer({
      source: this.webCamSource,
      zIndex: 9
    });
  }

  private createLayerLocator(val1, val2) {

    let features = [];
    this.featureLocation = new Feature({
      geometry: new Point(fromLonLat([val1, val2])),

    });
    this.featureLocation.setId("privateID");

    features.push(this.featureLocation);


    this.featureLocation.setStyle(new Style({
      image: new Icon({
        color: 'white',
        crossOrigin: 'anonymous',
        imgSize: [30, 30],
        src: 'assets/icons//geoLocation.png'
      })
    }));
    // assets/icons//geolocator-icon.svg
    // webcam.png



    this.locatorSource = new VectorSource({
      features: features
    });

    this.locatorLayer = new VectorLayer({
      source: this.locatorSource,
      zIndex: 10
    });
  }


  private initMap(): void {

    this.createLayerLocator(0, 0);
    this.createLayeWebCam(0, 0);


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
      layers: [this.webCamLayer, this.areaWebCamLayer, this.locatorLayer],
      target: 'map',
      view: this.mapView,
    });

    var scaleline = new ScaleLine();
    this.map.addControl(scaleline);
  }


  //ControlValueAccessor
  writeValue(value: any): void {
    if (value) {
      if (value.range !== undefined) {
        this.range = value.range;
      }
      if (value.display !== undefined) {
        this.displayWebCam = value.display;
      }

      if (this.map) {
        let querriedLayer = this._layerService.getSource(value);
        if (querriedLayer && querriedLayer.layer) {
          let mapLayers = this.map.getLayers();
          if (mapLayers) {
            mapLayers.clear();
            this.map.addLayer(querriedLayer.layer);
            this.map.addLayer(this.locatorLayer);
            this.map.addLayer(this.webCamLayer);
            this.map.addLayer(this.areaWebCamLayer);
          }
        }
        this.map.changed();
      }
      if (value.center) {
        this.isWorking = true;
        this.geolocationLat = value.center.lat;
        this.geolocationLon = value.center.lon;
        this.map.removeLayer(this.locatorLayer);
        this.map.removeLayer(this.webCamLayer);
        this.map.removeLayer(this.areaWebCamLayer);
        if (this.webCamSubscription) {
          this.webCamSubscription.unsubscribe();
        }
        this.webCamSubscription = this._webCamService.getNearestWebcams(this.geolocationLat, this.geolocationLon, 10000).subscribe(data => {
          this.createLayerLocator(this.geolocationLon, this.geolocationLat);
          this.createLayeWebCam(this.geolocationLon, this.geolocationLat);
          this.map.addLayer(this.locatorLayer);
          this.map.addLayer(this.webCamLayer);
          this.map.addLayer(this.areaWebCamLayer);
          this.isWorking = false;
          this.map.changed();

          let target = fromLonLat([value.center.lon, value.center.lat]);
          this.mapView.animate({
            center: fromLonLat([value.center.lon, value.center.lat]),
            duration: 3000,
          });
        });
      }
      if (value.range) {
        if (value.display) {
          this.map.removeLayer(this.webCamLayer);
          this.map.removeLayer(this.areaWebCamLayer);
          console.log(this.geolocationLon);
          this.createLayeWebCam(this.geolocationLon, this.geolocationLat);
          this.map.addLayer(this.webCamLayer);
          this.map.addLayer(this.areaWebCamLayer);
          this.map.changed();


        } else {
          this.map.removeLayer(this.webCamLayer);
          this.map.removeLayer(this.areaWebCamLayer);

        }
        this.map.changed();
      }
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


  private processSelectedFeature(event: any): void {
    event.target.getFeatures().forEach(element => {
      if (element.getId() !== "privateID") {
        this.propagateChange(element.get("WebCam"));
      }
      console.log(this.featureLocation);
      console.log(element);
    });
  }

  ngOnInit(): void {
    this.selectSingleClick = new Select({
      layers: (data) => {
        return (data === this.locatorLayer || data === this.webCamLayer)
      }
    });
    //     var modify = new Modify({source: source});
    // map.addInteraction(modify);
    var translate = new Translate({
      layers: (data) => {
        return (data === this.locatorLayer)
      },
      features: this.selectSingleClick.getFeatures()
    });
    this.initMap();
    this.map.addInteraction(this.selectSingleClick);
    this.map.addInteraction(translate);
    // this.selectSingleClick.on('select', function (e) {
    //   e.target.getFeatures().forEach(element => {
    //     if(element !== this.featureLocation){
    //       //this.propagateChange(null);
    //     }
    //     console.log(this.featureLocation);
    //     console.log(element);

    //   });
    // });
    this.selectSingleClick.on('select', (event) => {
      this.processSelectedFeature(event);
    });


    translate.on('translateend', (event) => {
      let coord = toLonLat(event.coordinate);
      this.geolocationLon = coord[0];
      this.geolocationLat = coord[1];

      this.isWorking = true;
      this.map.removeLayer(this.locatorLayer);
      this.map.removeLayer(this.webCamLayer);
      this.map.removeLayer(this.areaWebCamLayer);
      if (this.webCamSubscription) {
        this.webCamSubscription.unsubscribe();
      }
      this.webCamSubscription = this._webCamService.getNearestWebcams(this.geolocationLat, this.geolocationLon, 10000).subscribe(data => {
        this.createLayerLocator(this.geolocationLon, this.geolocationLat);
        this.createLayeWebCam(this.geolocationLon, this.geolocationLat);
        this.map.addLayer(this.locatorLayer);
        this.map.addLayer(this.webCamLayer);
        this.map.addLayer(this.areaWebCamLayer);
        this.isWorking = false;
        this.map.changed();

      });
    })
  }

  public flyTo(location, done): void {
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
      duration: duration / 4
    }, {
      zoom: zoom,
      duration: duration / 4
    }, callback);
  }

  private getStubbedwebCams(): WebCamItemModel[] {
    let webCam1 = {
      id: "1",
      status: "Active",
      title: "Le soulié",
      image: {
        current: {
          icon: "",
          thumbnail: "https://images-webcams.windy.com/63/1514532263/current/thumbnail/1514532263.jpg",
          preview: "",
          toenail: ""
        },
        daylight: {
          icon: "string",
          thumbnail: "string",
          preview: "string",
          toenail: "string"
        },
        sizes: {
          icon: {
            width: 100,
            height: 100
          },
          thumbnail: {
            width: 100,
            height: 100
          },
          preview: {
            width: 100,
            height: 100
          },
          toenail: {
            width: 100,
            height: 100
          }
        },
        update: 100
      },
      location: {
        city: "string",
        region: "string",
        region_code: "string",
        country: "string",
        country_code: "string",
        continent: "string",
        continent_code: "string",
        latitude: 48,
        longitude: 2,
        timezone: "string"
      },
      player: {
        live: {
          available: false,
          embed: "string"
        },
        day: {
          available: true,
          link: "string",
          embed: "https://webcams.windy.com/webcams/public/embed/player/1514532263/day"
        },
        month: {
          available: true,
          link: "string",
          embed: "string"
        },
        year: {
          available: true,
          link: "string",
          embed: "string"
        },
        lifetime: {
          available: true,
          link: "string",
          embed: "https://webcams.windy.com/webcams/public/embed/player/1514532263/lifetime"
        }
      }
    };
    let webCam2 = {
      id: "2",
      status: "Active",
      title: "La salvetat",
      image: {
        current: {
          icon: "",
          thumbnail: "https://images-webcams.windy.com/65/1565047565/current/thumbnail/1565047565.jpg",
          preview: "",
          toenail: ""
        },
        daylight: {
          icon: "string",
          thumbnail: "string",
          preview: "string",
          toenail: "string"
        },
        sizes: {
          icon: {
            width: 100,
            height: 100
          },
          thumbnail: {
            width: 100,
            height: 100
          },
          preview: {
            width: 100,
            height: 100
          },
          toenail: {
            width: 100,
            height: 100
          }
        },
        update: 100
      },
      location: {
        city: "string",
        region: "string",
        region_code: "string",
        country: "string",
        country_code: "string",
        continent: "string",
        continent_code: "string",
        latitude: 48,
        longitude: 2,
        timezone: "string"
      },
      player: {
        live: {
          available: false,
          embed: "string"
        },
        day: {
          available: true,
          link: "string",
          embed: "https://webcams.windy.com/webcams/public/embed/player/1565047565/day"
        },
        month: {
          available: true,
          link: "string",
          embed: "string"
        },
        year: {
          available: true,
          link: "string",
          embed: "string"
        },
        lifetime: {
          available: true,
          link: "string",
          embed: "https://webcams.windy.com/webcams/public/embed/player/1565047565/year"
        }
      }
    }
    return [webCam1, webCam2];

  }
}
