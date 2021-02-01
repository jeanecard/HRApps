import { TestBed } from '@angular/core/testing';

import { HRPicturesSubmissionService } from './hrpictures-submission.service';

describe('HRPicturesSubmissionService', () => {
  let service: HRPicturesSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HRPicturesSubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
