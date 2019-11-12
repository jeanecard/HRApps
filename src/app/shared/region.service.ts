import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region } from 'src/app/model/region';
import { Observable, from, Subject } from 'rxjs';

// Singleton regions Service
@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private ServiceURL = 'https://fullcoreservices-ci.azurewebsites.net/api/v1.0/HRContinent';
  private regions$ = new Subject<Region[]>();

  constructor(private http: HttpClient) {
    http.get<Region[]>(this.ServiceURL)
      .subscribe(data => this.regions$.next(data));
  }

  getRegions(): Observable<Region[]> {
    return this.regions$.asObservable();
  }
}
