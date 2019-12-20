import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region } from 'src/app/model/region';
import { Observable, from, Subject } from 'rxjs';
import { first, last } from 'rxjs/operators';

// Singleton regions Service
@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private ServiceURL = 'https://fullcoreservices-ci.azurewebsites.net/api/v1.0/HRContinent';
  //private ServiceURL = 'http://localhost:50147/api/v1.0/HRContinent';

  private regions$ = new Subject<Region[]>();
  private regionObservable$: Observable<Region[]>

  constructor(private http: HttpClient) {
  }

  getDefaultRegionFilterValue(): Region{
    return Region.Europe;
  }

  getRegions(): Observable<Region[]> {
    this.http.get<Region[]>(this.ServiceURL).subscribe(data => {
      this.regions$.next(data);
    });

    return this.regions$.asObservable();
  }
}
