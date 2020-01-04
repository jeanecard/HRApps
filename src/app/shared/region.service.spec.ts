import { TestBed, async } from '@angular/core/testing';
import {
  getTestBed,
  inject
} from '@angular/core/testing';

import {
  Headers, BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';

import {ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { RegionService } from './region.service';

describe('RegionService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        RegionService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                return new Http(backend, defaultOptions);
            }
         }
      ],
      imports: [
        HttpModule
      ]
    });
    TestBed.compileComponents();
  }));
  // tests here
});