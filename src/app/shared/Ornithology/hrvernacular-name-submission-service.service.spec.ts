import { TestBed } from '@angular/core/testing';

import { HRVernacularNameSubmissionServiceService } from './hrvernacular-name-submission.service';

describe('HRVernacularNameSubmissionServiceService', () => {
  let service: HRVernacularNameSubmissionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HRVernacularNameSubmissionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
