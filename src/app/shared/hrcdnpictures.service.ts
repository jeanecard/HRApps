import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HRCDNPicturesService {
  public static readonly NO_RESULT_ID  = "NoResult";
  public static readonly INTERNATIONAL_ID  = "International";
  public static readonly MAP_ID  = "Map";
  public static readonly GEOLOCATOR_ID  = "GeoLocator";
  public static readonly HRNITHOLOGY_ID  = "HRNothology";
  public static readonly HRDRAWING_ID  = "HRDrawing";


  private readonly rootUrl = "https://jeanecard.github.io/HRBirdsPicturesDB/HRAPPS-CDN/";
  private _dictionary = new Object();
  constructor() { 
    this._dictionary[HRCDNPicturesService.NO_RESULT_ID] = this.rootUrl + "no-result.png";
    this._dictionary[HRCDNPicturesService.INTERNATIONAL_ID] = this.rootUrl + "International.png";
    this._dictionary[HRCDNPicturesService.MAP_ID] = this.rootUrl + "map95.svg";
    this._dictionary[HRCDNPicturesService.GEOLOCATOR_ID] = this.rootUrl + "geoLocator12.svg";
    this._dictionary[HRCDNPicturesService.HRNITHOLOGY_ID] = this.rootUrl + "hrnithologie4.svg";
    this._dictionary[HRCDNPicturesService.HRDRAWING_ID] = this.rootUrl + "drawing.svg";

  }
 
  public getPicture(id:string) : string{
    console.log("-----------------------------");
    console.log( this._dictionary);
    console.log(id);
    if(this._dictionary[id] != undefined){
      return this._dictionary[id];
    }
    return "";
  }
}
