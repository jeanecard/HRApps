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
    this.http.get<Language[]>(urlToQuery)
      .subscribe(data => {
        const emptyLanguage = new Language();
        emptyLanguage.name = '';
        data.push(emptyLanguage);
        this.languages$.next(data);
      });
    return this.languages$.asObservable();
  }
}
