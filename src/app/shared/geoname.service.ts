import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { GeonameOutput } from '../model/geoname';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeonameService {

  private _geonameServiceURLStart = 'https://hrcorebordersservicesv-3-1.azurewebsites.net/api/v1.0/HRGeoname/'
  private _passage = 1;

  constructor(private http: HttpClient) { }
  public getPlaces(val: string): Observable<GeonameOutput> {
    return this.http.get<GeonameOutput>(this._geonameServiceURLStart + val);
  }
}
