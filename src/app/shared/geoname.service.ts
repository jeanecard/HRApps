import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeonameOutput } from '../model/geoname';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeonameService {

  private _geonameServiceURLStart = 'https://secure.geonames.org/searchJSON?q='
  private _geonameServiceURLEnd = '&maxRows=5&username=jean.ecard';


  constructor(private http: HttpClient) { }
  public getPlaces(val: string): Observable<GeonameOutput> {
    return this.http.get<GeonameOutput>(this._geonameServiceURLStart + val + this._geonameServiceURLEnd);
  }
}
