import { TestBed } from '@angular/core/testing';

import { HRCDNPicturesService } from './hrcdnpictures.service';

describe('HRCDNPicturesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HRCDNPicturesService = TestBed.get(HRCDNPicturesService);
    expect(service).toBeTruthy();
  });
});
