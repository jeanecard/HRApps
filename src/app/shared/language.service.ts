import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Language } from 'src/app/model/language';
import { Observable, from, Subject } from 'rxjs';
import { Region } from '../model/region';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private BaseServiceURL = 'https://fullcoreservices-ci.azurewebsites.net/api/v1.0/HRLangagesByContinent';
  private languages$ = new Subject<Language[]>();
  constructor(private http: HttpClient) { }

  getLanguagesByContinent(continent: Region): Observable<Language[]> {
    let urlToQuery = this.BaseServiceURL;
    if (continent && continent !== Region.All) {
      urlToQuery += '/' + continent.toString();
    }
    return this.http.get<Language[]>(urlToQuery);
    // this.http.get<Language[]>(urlToQuery)
    //   .subscribe(data => {
    //     this.languages$.next(data);
    //   });
    // return this.languages$.asObservable();
  }

  getDefaultLanguageFilterValue(): Language {
    let lsOverValue = localStorage.getItem('iso639_1');
    if(lsOverValue){
      return {
        iso639_1: lsOverValue,
        iso639_2: 'AFAIRE',
        name: 'AFAIRE',
        nativeName: 'AFAIRE'
      };
    }
    return {
      iso639_1: '',
      iso639_2: '',
      name: '',
      nativeName: ''
    };
  }

  setDefaultLanguageFilterValue(isoCode : string): void {
    localStorage.setItem('iso639_1', isoCode);
  }

}
