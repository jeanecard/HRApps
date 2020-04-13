import { TestBed } from '@angular/core/testing';

import { GeonameService } from './geoname.service';

describe('GeonameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeonameService = TestBed.get(GeonameService);
    expect(service).toBeTruthy();
  });
});
