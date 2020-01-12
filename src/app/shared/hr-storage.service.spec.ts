import { TestBed } from '@angular/core/testing';

import { HrStorageService } from './hr-storage.service';

describe('HrStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrStorageService = TestBed.get(HrStorageService);
    expect(service).toBeTruthy();
  });
});
