import { TestBed } from '@angular/core/testing';

import { SourceMapService } from './source-map.service';

describe('SourceMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SourceMapService = TestBed.get(SourceMapService);
    expect(service).toBeTruthy();
  });
});
