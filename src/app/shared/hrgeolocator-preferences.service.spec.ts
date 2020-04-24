import { TestBed } from '@angular/core/testing';

import { HRGeolocatorPreferencesService } from './hrgeolocator-preferences.service';

describe('HRGeolocatorPreferencesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HRGeolocatorPreferencesService = TestBed.get(HRGeolocatorPreferencesService);
    expect(service).toBeTruthy();
  });
});
