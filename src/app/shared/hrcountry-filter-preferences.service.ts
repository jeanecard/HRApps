import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { RegionService } from './region.service';
import { HRPopulationValuesService } from './hrpopulation-values.service';
import { IHRCountryFilterModel } from './components/hrcountry-filter/ihrcountry-filter-model';

@Injectable({
  providedIn: 'root'
})
export class HRCountryFilterPreferencesService {

  constructor(private langService: LanguageService,
    private regionService: RegionService,
    private populationService: HRPopulationValuesService) { }

  public getDefaultValue(): IHRCountryFilterModel {
    let population =  this.populationService.getDefaultPopulationFilterValue();
    return {
      regionAndLanguage: {
        region: this.regionService.getDefaultRegionFilterValue(),
        language: this.langService.getDefaultLanguageFilterValue().iso639_1
      },
      population: {
        amount: population.amount,
        over: population.over
      }
    };
  }
}
