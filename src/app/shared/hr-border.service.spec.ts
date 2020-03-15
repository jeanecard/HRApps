import { TestBed } from '@angular/core/testing';

import { HrBorderService } from './hr-border.service';

describe('HrBorderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrBorderService = TestBed.get(HrBorderService);
    expect(service).toBeTruthy();
  });
});
