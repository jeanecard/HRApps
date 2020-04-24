import { TestBed } from '@angular/core/testing';

import { HRWebcamRangePreferencesService } from './hrwebcam-range-preferences.service';

describe('HRWebcamRangePreferencesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HRWebcamRangePreferencesService = TestBed.get(HRWebcamRangePreferencesService);
    expect(service).toBeTruthy();
  });
});
