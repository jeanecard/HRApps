import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { GeonameOutput } from '../model/geoname';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeonameService {

  private _geonameServiceURLStart = 'https://hrcorebordersservicesv-3-1.azurewebsites.net/api/HRGeoname/'
  private _passage = 1;

  constructor(private http: HttpClient) { }
  public getPlaces(val: string): Observable<GeonameOutput> {
    // let val1 = {
    //   "adminCode1" : "",
    //   "lng": "1",
    //   "geonameId": 1,
    //   "toponymName": "",
    //   "countryId": "",
    //   "fcl": "",
    //   "population": 2,
    //   "countryCode": "",
    //   "name": "AA",
    //   "fclName": "",
    //   "adminCodes1": null,
    //   "countryName": "",
    //   "fcodeName": "",
    //   "adminName1": "",
    //   "lat": "",
    //   "fcode": "",
    // };
    // let val2 = {
    //   "adminCode1" : "",
    //   "lng": "1",
    //   "geonameId": 1,
    //   "toponymName": "",
    //   "countryId": "",
    //   "fcl": "",
    //   "population": 2,
    //   "countryCode": "",
    //   "name": "BB",
    //   "fclName": "",
    //   "adminCodes1": null,
    //   "countryName": "",
    //   "fcodeName": "",
    //   "adminName1": "",
    //   "lat": "",
    //   "fcode": "",
    // }

    // if(this._passage == 1){
    //   let retour =  {
    //     "totalResultsCount" : 2,
    //     "geonames" : [val1, val2]
    //   };
    //   this._passage = 2;
    //   return of(retour).pipe(delay(5000));
      
    // } else{
    //   val1.name = "CC";
    //   val2.name = "DD";
    //   let retour =  {
    //     "totalResultsCount" : 2,
    //     "geonames" : [val1, val2]
    //   };
    //   this._passage = 2;
    //   return of(retour).pipe(delay(1000));
    // }



    return this.http.get<GeonameOutput>(this._geonameServiceURLStart + val);
  }
}
