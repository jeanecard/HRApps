import { TestBed } from '@angular/core/testing';

import { HRWebCamService } from './hrweb-cam.service';

describe('HRWebCamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HRWebCamService = TestBed.get(HRWebCamService);
    expect(service).toBeTruthy();
  });
});
