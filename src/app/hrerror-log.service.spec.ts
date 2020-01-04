import { TestBed } from '@angular/core/testing';

import { HRErrorLogService } from './hrerror-log.service';

describe('HRErrorLogService', () => {

  let service: HRErrorLogService;
  beforeEach(() =>{
    TestBed.configureTestingModule({
      providers: [
        HRErrorLogService,
      ]
    });
    service = TestBed.get(HRErrorLogService);
  }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
