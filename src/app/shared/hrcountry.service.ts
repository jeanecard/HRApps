import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HRCountry } from '../model/hrcountry';
import { Observable, Subject } from 'rxjs';
import { Region } from '../model/region';
import { Language } from '../model/language';
import { PopulationFilterModel } from '../model/population-filter-model';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HRCountryService {

  private countries$ = new Subject<HRCountry[]>();
  private ServiceURL = 'https://fullcoreservices-ci.azurewebsites.net/api/v1.0/';


  constructor(private http: HttpClient) { }

  getCountries(region: Region, language: Language, population: PopulationFilterModel): Observable<HRCountry[]> {
    let regionProcessed = region;
    if(region == null || region == undefined){
      regionProcessed = Region.All;
    }
    if(regionProcessed){
    const urlToQuery = this.getURL(regionProcessed, language, population);
    if (population && population.amount > 0) {
      return this.http.get<HRCountry[]>(urlToQuery).pipe(map(data => data.filter((element, index, array) => {
        if (population.over) {
          return (element.population >= population.amount);
        }
        else {
          return (element.population < population.amount);
        }

      })));
    } else {
      return this.http.get<HRCountry[]>(urlToQuery);
    }
    }
    return null;
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
