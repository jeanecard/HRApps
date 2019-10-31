import { TestBed } from '@angular/core/testing';

import { HRCountryService } from './hrcountry.service';

describe('HRCountryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HRCountryService = TestBed.get(HRCountryService);
    expect(service).toBeTruthy();
  });
});
