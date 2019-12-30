import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { RegionService } from './region.service';
import { HRPopulationValuesService } from './hrpopulation-values.service';
import { Region } from '../model/region';
import { HRCountryFilterModel } from './components/hrcountry-filter/hrcountry-filter-model';

@Injectable({
  providedIn: 'root'
})
export class HRCountryFilterPreferencesService {

  constructor(private langService: LanguageService,
    private regionService: RegionService,
    private populationService: HRPopulationValuesService) { }

  public getDefaultValue(): HRCountryFilterModel {

    return {
      regionAndLanguage: {
        region: Region.All,
        language: 'fr'
      },
      population: {
        amount: 100000,
        over: true
      }
    };
  }
}
