import { TestBed } from '@angular/core/testing';

import { HRPopulationValuesService } from './hrpopulation-values.service';

describe('HRPopulationValuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HRPopulationValuesService = TestBed.get(HRPopulationValuesService);
    expect(service).toBeTruthy();
  });
});
