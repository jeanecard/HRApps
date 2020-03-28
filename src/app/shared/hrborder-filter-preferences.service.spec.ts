import { TestBed } from '@angular/core/testing';

import { HRBorderFilterPreferencesService } from './hrborder-filter-preferences.service';

describe('HRBorderFilterPreferencesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HRBorderFilterPreferencesService = TestBed.get(HRBorderFilterPreferencesService);
    expect(service).toBeTruthy();
  });
});
