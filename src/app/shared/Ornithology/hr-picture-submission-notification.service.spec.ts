import { TestBed } from '@angular/core/testing';

import { HrPictureSubmissionNotificationService } from './hr-picture-submission-notification.service';

describe('HrPictureSubmissionNotificationService', () => {
  let service: HrPictureSubmissionNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrPictureSubmissionNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
