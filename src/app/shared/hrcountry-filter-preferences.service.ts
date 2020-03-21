import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { RegionService } from './region.service';
import { HRPopulationValuesService } from './hrpopulation-values.service';
import { IHRCountryFilterModel } from './components/hrcountry-filter/ihrcountry-filter-model';
import { HrMapTheme } from '../model/hr-map-theme';
import { MapLayerService } from './map-layer.service';

@Injectable({
  providedIn: 'root'
})
export class HRCountryFilterPreferencesService {

  constructor(private langService: LanguageService,
    private regionService: RegionService,
    private populationService: HRPopulationValuesService,
    private mapService : MapLayerService) { }

  public getDefaultValue(): IHRCountryFilterModel {
    let population = this.populationService.getDefaultPopulationFilterValue();
    return {
      regionAndLanguage: {
        region: this.regionService.getDefaultRegionFilterValue(),
        language: this.langService.getDefaultLanguageFilterValue().iso639_1
      },
      population: {
        amount: population.amount,
        over: population.over
      },
      map: this.mapService.getDefaultSource()
    };
  }
  public setValue(val: IHRCountryFilterModel) {
    if (val) {
      if (val.population) {
        this.populationService.SetDefaultPopulationFilterValue(val.population);
      }
      if (val.regionAndLanguage){
        this.regionService.setDefaultRegionFilterValue(val.regionAndLanguage.region);
        this.langService.setDefaultLanguageFilterValue(val.regionAndLanguage.language);
      }
    }
  }

}
