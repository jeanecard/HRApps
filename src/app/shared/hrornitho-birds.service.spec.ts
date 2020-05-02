import { TestBed } from '@angular/core/testing';

import { HROrnithoBirdsService } from './hrornitho-birds.service';

describe('HROrnithoBirdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HROrnithoBirdsService = TestBed.get(HROrnithoBirdsService);
    expect(service).toBeTruthy();
  });
});
