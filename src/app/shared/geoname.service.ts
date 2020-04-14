import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GeonameOutput } from '../model/geoname';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeonameService {

  private _geonameServiceURLStart = 'https://hrcorebordersservicesv-3-1.azurewebsites.net/api/HRGeoname/'
  

  constructor(private http: HttpClient) { }
  public getPlaces(val: string): Observable<GeonameOutput> {
    return this.http.get<GeonameOutput>(this._geonameServiceURLStart + val);
  }
}
