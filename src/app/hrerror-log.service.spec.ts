import { TestBed } from '@angular/core/testing';

import { HRErrorLogService } from './hrerror-log.service';

describe('HRErrorLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HRErrorLogService = TestBed.get(HRErrorLogService);
    expect(service).toBeTruthy();
  });
});
