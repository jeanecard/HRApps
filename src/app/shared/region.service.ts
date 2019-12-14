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
  private regionObservable$ : Observable<Region[]>

  constructor(private http: HttpClient) {
    this.regionObservable$ = http.get<Region[]>(this.ServiceURL);
    //!TODO revoir les subject avec une reemission
      // .subscribe(data => {
      //   console.log("RECU 1 depuis get");
      //   this.regions$.next(data);
      // });
  }

  getRegions(): Observable<Region[]> {
   //Reemit last one before complete.

    return this.regionObservable$.pipe(last());
    //return this.regions$.asObservable().pipe(last());
  }
}
