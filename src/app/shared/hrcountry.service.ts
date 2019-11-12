import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HRCountry } from '../model/hrcountry';
import { Observable, Subject } from 'rxjs';
import { Region } from '../model/region';
import { Language } from '../model/language';
import { PopulationFilterModel } from '../model/population-filter-model';

@Injectable({
  providedIn: 'root'
})
export class HRCountryService {

  private countries$ = new Subject<HRCountry[]>();
  private ServiceURL = 'https://fullcoreservices-ci.azurewebsites.net/api/v1.0/';

  constructor(private http: HttpClient) { }

  getCountries(region: Region, language: Language, population: PopulationFilterModel): Observable<HRCountry[]> {
    const urlToQuery = this.getURL(region, language, population);
    if (population) {
      if (population.over) {
        this.http.get<HRCountry[]>(urlToQuery)
          .subscribe(data => {
            this.countries$.next(data.filter(item => item.population > population.amount));
          });
      } else {
        this.http.get<HRCountry[]>(urlToQuery).subscribe(data => {
          this.countries$.next(data.filter(item => item.population < population.amount));
        });
      }
    } else {
      this.http.get<HRCountry[]>(urlToQuery)
        .subscribe(data => {
          this.countries$.next(data);
        });
    }
    return this.countries$.asObservable();
  }

  /// Process WebService URL
  getURL(region: Region, language: Language, population: PopulationFilterModel): string {
    let urlToQuery = this.ServiceURL;
    if (region) {
      if (language && language.iso639_1 && language.iso639_1 !== '') {
        urlToQuery += 'HRCountriesByContinentByLangage/' + region.toString() + '/' + language.iso639_1;
      } else {
        urlToQuery += 'HRCountriesByContinent/' + region.toString();
      }
    } else {
      if (language && language.iso639_1 && language.iso639_1 !== '') {
        urlToQuery += 'HRCountriesByContinentByLangage/' + Region.All.toString() + '/' + language.iso639_1;
      } else {
        urlToQuery += 'HRCountriesByContinent/All';
      }
    }
    return urlToQuery;
  }
}
