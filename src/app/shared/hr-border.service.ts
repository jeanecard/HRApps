import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HrBorder } from '../model/hr-border';
import { Region } from '../model/region';
import { Language } from '../model/language';
import { PopulationFilterModel } from '../model/population-filter-model';

@Injectable({
  providedIn: 'root'
})
export class HrBorderService {
  private BaseServiceURL = 'https://fullcoreservices-ci.azurewebsites.net/api/v1.0/HRBordersByContinent/';

  constructor(private http: HttpClient) { }

  getBorders(region : Region, lang : Language, pop : PopulationFilterModel): Observable<HrBorder[]> {
    let urlToQuery = this.BaseServiceURL;
    console.log(region);
    return this.http.get<HrBorder[]>(urlToQuery + region);
  }
}
