import { TestBed, async } from '@angular/core/testing';

import { RegionService, RegionServiceConstants } from './region.service';
import { HrLocalStorageMockService } from '../tests/hr-local-storage-mock-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Region } from '../model/region';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


describe('RegionService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const mockStorage = new HrLocalStorageMockService();

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HrStorageService', ['getItem']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }
    );
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  it('can test HttpClient.get', () => {
    const expectedRegions: Region[] =
      [Region.All, Region.Europe];


    // Make an HTTP GET request
    httpClient.get<Region[]>(RegionServiceConstants.SERVICE_URL)
      .subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(expectedRegions)
      );

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(RegionServiceConstants.SERVICE_URL);

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(expectedRegions);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


  it('#getRegions should use RegionServiceConstants.SERVICE_URL on httpClient', () => {
    let service: RegionService = TestBed.get(RegionService);
    const expectedRegions: Region[] =
      [Region.All, Region.Europe];
    expect(service).toBeDefined();
    service.getRegions().subscribe(data =>
      // When observable resolves, result should match test data
      expect(data).toEqual(expectedRegions)
    );
    const req = httpTestingController.expectOne(RegionServiceConstants.SERVICE_URL);

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(expectedRegions);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  it('#getRegions should return error on http service error', () => {
    const emsg = 'deliberate 404 error';
    
    let service: RegionService = TestBed.get(RegionService);
    const expectedRegions: Region[] = null;
    expect(service).toBeDefined();
    service.getRegions().subscribe(
      data => fail('should have failed with the error'),
      (error: HttpErrorResponse) => {
        expect(error).toBeDefined;

      }
    );
      const req = httpTestingController.expectOne(RegionServiceConstants.SERVICE_URL);
  
    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it('#getDefaultRegionFilterValue should return Region.All if value from HRStorageService is not a Region', () => {
    let service: RegionService = new RegionService(httpClient, mockStorage);
    mockStorage.value = 'not a region';
    mockStorage.throwException = false;
    expect(service.getDefaultRegionFilterValue()).toBe(Region.All);
  });

  it('#getDefaultRegionFilterValue should throw Error if HRStorage is not supplied', () => {
    let service: RegionService = new RegionService(httpClient, null);
    expect(function () { service.getDefaultRegionFilterValue(); }).toThrowError(RegionServiceConstants.SERVICE_ERROR);
  });

  it('#getDefaultRegionFilterValue should return stored Region (Europe)', () => {
    let service: RegionService = new RegionService(httpClient, mockStorage);
    mockStorage.value = 'Europe';
    mockStorage.throwException = false;
    expect(service.getDefaultRegionFilterValue()).toBe(Region.Europe);
  });

  it('#setDefaultRegionFilterValue should not throw Exception if HRStorageService can not set value', () => {
    let service: RegionService = new RegionService(httpClient, mockStorage);
    mockStorage.throwException = true;
    expect(function () { service.setDefaultRegionFilterValue(Region.Europe) }).not.toThrowError();
  });

  it('#setDefaultRegionFilterValue should set correct value in getDefaultRegionFilterValue', () => {
    let service: RegionService = new RegionService(httpClient, mockStorage);
    mockStorage.throwException = false;
    mockStorage.value = '42';
    service.setDefaultRegionFilterValue(Region.Europe)
    expect(service.getDefaultRegionFilterValue()).toBe(Region.Europe);
  });
});