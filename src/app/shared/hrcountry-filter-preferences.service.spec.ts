import { TestBed, inject } from '@angular/core/testing';

import { HRCountryFilterPreferencesService } from './hrcountry-filter-preferences.service';
import { Region } from '../model/region';
import { Language } from '../model/language';
import { LanguageService } from './language.service';
import { RegionService } from './region.service';
import { HRPopulationValuesService } from './hrpopulation-values.service';
import { PopulationFilterModel } from '../model/population-filter-model';
// import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

describe('HRCountryFilterPreferencesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        HRCountryFilterPreferencesService,
        { provide: LanguageService, useClass: mockLanguageService },
        { provide: RegionService, useClass: mockRegionService },
        { provide: HRPopulationValuesService, useClass: mockHRPopulationValuesService },
        // { provide: WebStorageService, useClass: mockWebStorageService}
      ]
    })
  );
  it('should be created', () => {
    const service: HRCountryFilterPreferencesService = TestBed.get(HRCountryFilterPreferencesService);
    expect(service).toBeTruthy();
  });
  it('should return getDefaultValue', () => {
    const service: HRCountryFilterPreferencesService = TestBed.get(HRCountryFilterPreferencesService);
    let result = service.getDefaultValue();
    expect(result).toBeTruthy();
    expect(result.population).toBeTruthy();
    expect(result.population.amount).toEqual(42);
    expect(result.population.over).toEqual(true);
    expect(result.regionAndLanguage).toBeTruthy();
    expect(result.regionAndLanguage.language).toEqual('xx');
    expect(result.regionAndLanguage.region).toEqual(Region.All);
  });
});
class mockLanguageService {
  getDefaultLanguageFilterValue(): Language {
    return {
      iso639_1: 'xx',
      iso639_2: 'fra',
      name: 'france',
      nativeName: 'france'
    };
  }
}

class mockRegionService{
  getDefaultRegionFilterValue(): Region{
    return Region.All;
  }
}
class mockHRPopulationValuesService{
  public getDefaultPopulationFilterValue(): PopulationFilterModel{
    return {amount:42, over:true }; 
  }
}
// class mockWebStorageService{
//   //Dummy.
// }
