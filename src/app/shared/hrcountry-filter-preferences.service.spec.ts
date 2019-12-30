import { TestBed } from '@angular/core/testing';

import { HRCountryFilterPreferencesService } from './hrcountry-filter-preferences.service';

describe('HRCountryFilterPreferencesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HRCountryFilterPreferencesService = TestBed.get(HRCountryFilterPreferencesService);
    expect(service).toBeTruthy();
  });
});
