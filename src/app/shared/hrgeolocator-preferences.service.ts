import { Injectable } from '@angular/core';
import { HRGeoLocatorPreferences } from '../model/hrgeo-locator-preferences';
import { HRWebcamRangePreferencesService } from './hrwebcam-range-preferences.service';
import { MapLayerService } from './map-layer.service';

@Injectable({
  providedIn: 'root'
})
export class HRGeolocatorPreferencesService {

  private static readonly _keyMapStorage = 'geoLocator-Map';
  private static readonly _keyLocatorStorage = 'geoLocator-Locator';
  private static readonly _keyCenterLatStorage = 'geoLocator-CenterLat';
  private static readonly _keyCenterLonStorage = 'geoLocator-CenterLon';
  private static readonly _keyPrefix = 'geoLocator-';


  constructor(private webCamRangeService: HRWebcamRangePreferencesService,
    private mapService : MapLayerService) { 
      this.webCamRangeService.prefix = HRGeolocatorPreferencesService._keyPrefix;
    }

   /**
* Get the default value from local storage
*  1- Check context
*  2- If Local Storage is not fully available and consistant, return null value
*  3- Else return value from local storage
* @method getDefaultValue
* @return {HRGeoLocatorPreferences} a HRGeoLocatorPreferences from local storage or the default value if localstorage is not set or properly set.
*/
  public getDefaultValue(): HRGeoLocatorPreferences {
    //1-
    if (localStorage == null || localStorage == undefined) {
      return this.getNullValue();
    }
    //2-
    const lsMap = localStorage.getItem(HRGeolocatorPreferencesService._keyMapStorage);
    const lsLocator = localStorage.getItem(HRGeolocatorPreferencesService._keyLocatorStorage);
    const lsLat = localStorage.getItem(HRGeolocatorPreferencesService._keyCenterLatStorage);
    const lsLon = localStorage.getItem(HRGeolocatorPreferencesService._keyCenterLonStorage);
    if( lsLon == null || lsLon == null || lsLocator == null || lsMap == null){
      return this.getNullValue();
    }
    const lsLatNumber = Number(lsLat);
    const lsLonNumber = Number(lsLon);
    if(lsLatNumber === NaN || lsLonNumber == NaN){
      return this.getNullValue();
    }
    //3-
    return {
      map: lsMap,
      mapCenterLat: lsLatNumber,
      mapCenterLon: lsLonNumber,
      range: this.webCamRangeService.getDefaultValue(),
    };
  }
    /**
* Set the value to local storage
*  1- Check context
*  2- Set locale storage
* @method setDefaultValue
* @return Nothing. Does not throw any Exception.
*/
  public setDefaultValue(val: HRGeoLocatorPreferences): void {
 //1-
 if(val){
  //2-
  try {
    if(val.map){
      localStorage.setItem(HRGeolocatorPreferencesService._keyMapStorage, val.map);
    }
    if(val.mapCenterLat){
      localStorage.setItem(HRGeolocatorPreferencesService._keyCenterLatStorage, val.mapCenterLat.toString());
    }
    if(val.mapCenterLon){
      localStorage.setItem(HRGeolocatorPreferencesService._keyCenterLonStorage, val.mapCenterLon.toString());
    }
    this.webCamRangeService.setDefaultValue(val.range);
  }
  catch{
    console.log("Local storage not available.");
  }
}    
  }

   /**
* Get the null value 
* @method getNullValue
* @return a initialized  HRGeoLocatorPreferences
*/
  public getNullValue(): HRGeoLocatorPreferences {
    return {
      map: this.mapService.getDefaultSourceName(), 
      mapCenterLat: 43.6,
      mapCenterLon: 2.7167,
      range: this.webCamRangeService.getNullValue(),
    };
  }
}
