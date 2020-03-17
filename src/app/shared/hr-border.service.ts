import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HrBorder } from '../model/hr-border';
import { Region } from '../model/region';
import { Language } from '../model/language';
import { PopulationFilterModel } from '../model/population-filter-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HrBorderService {
  private _bordersByContinentServiceURL = 'https://fullcoreservices-ci.azurewebsites.net/api/v1.0/HRBordersByContinent/';
  private _bordersByContinentByLanguageServiceURL = 'https://fullcoreservices-ci.azurewebsites.net/api/v1.0/HRBordersByContinentByLangage/';

  constructor(private http: HttpClient) { }

  getBorders(region: Region, lang: Language, pop: PopulationFilterModel): Observable<HrBorder[]> {
  let urlToCall : string;

    if (region === undefined || region == null) {
      region = Region.All;
    }
    if (lang == null || lang == undefined || (lang.iso639_1 == undefined || lang.iso639_1 == null  || lang.iso639_1 === '') ) {
      if (pop == null || pop == undefined) {
        urlToCall = this._bordersByContinentServiceURL + region;
        console.log(urlToCall);
        return this.http.get<HrBorder[]>(urlToCall);
      } else {
        urlToCall = this._bordersByContinentServiceURL + region;
        console.log(urlToCall);
        if (pop.amount > 0) {
          
          return this.http.get<HrBorder[]>(urlToCall).pipe(map(data => data.filter((element, index, array) => {
            if (pop.over) {
              return (element.poP2005 >= pop.amount);
            }
            else {
              return (element.poP2005 < pop.amount);
            }
          })));
        } else{
          return this.http.get<HrBorder[]>(urlToCall);
        }
      }
    } else {
      urlToCall = this._bordersByContinentByLanguageServiceURL + region + '/' + lang.iso639_1;
      if (pop == null || pop == undefined) {
        return this.http.get<HrBorder[]>(urlToCall);
      } else {
        if (pop.amount > 0) {
          return this.http.get<HrBorder[]>(urlToCall).pipe(map(data => data.filter((element, index, array) => {
            if (pop.over) {
              return (element.poP2005 >= pop.amount);
            }
            else {
              return (element.poP2005 < pop.amount);
            }
          })));
        } else{
          return this.http.get<HrBorder[]>(urlToCall);
        }

      }
    }
  }
}
