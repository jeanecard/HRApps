import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Language } from 'src/app/model/language';
import { Observable, from } from 'rxjs';
import { Region } from '../model/region';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  getLanguagesByContinent(continent: Region): Observable<Language[]> {
    if (continent && continent !== Region.All) {
      return this.http.get<Language[]>('https://fullcoreservices-ci.azurewebsites.net/api/v1.0/HRLangagesByContinent/'
        + continent.toString());
    } else {
      return this.http.get<Language[]>('https://fullcoreservices-ci.azurewebsites.net/api/v1.0/HRLangagesByContinent');
    }
  }
}
