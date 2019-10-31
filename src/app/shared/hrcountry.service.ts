import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HRCountry } from '../model/hrcountry';
import { Observable } from 'rxjs';
import { Region } from '../model/region';
import { Language } from '../model/language';
import { PopulationFilterModel } from '../model/population-filter-model';

@Injectable({
  providedIn: 'root'
})
export class HRCountryService {

  constructor(private http: HttpClient) { }

  getCountries(region: Region, language: Language, population: PopulationFilterModel): Observable<HRCountry[]> {
    let query = 'https://fullcoreservices-ci.azurewebsites.net/api/v1.0/';
    if (region) {
      if (language && language.iso639_1 && language.iso639_1 !== '') {
        query = query + 'HRCountriesByContinentByLangage/' + region.toString() + '/' + language.iso639_1;
      } else {
        query = query + 'HRCountriesByContinent/' + region.toString();
      }
    } else {
      if (language && language.iso639_1 && language.iso639_1 !== '') {
        query = query + 'HRCountriesByContinentByLangage/' + Region.All.toString() + '/' + language.iso639_1;
      } else {
        query = query + 'HRCountriesByContinent/All';
      }
    }
    if (population) {
      console.log('To do rxjs Filter');
    }
    console.log('Je vais faire une query avec : ' + query);
    return this.http.get<HRCountry[]>(query);
  }
}