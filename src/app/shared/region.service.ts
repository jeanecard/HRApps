import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region } from 'src/app/model/region';
import { Observable } from 'rxjs';


export class RegionServiceConstants {
  static readonly serviceURL= 'https://fullcoreservices-ci.azurewebsites.net/api/v1.0/HRContinent';
  static readonly regionService_ls_region_key = 'region';
    //private ServiceURL = 'http://localhost:50147/api/v1.0/HRContinent';
}
// Singleton regions Service
@Injectable({
  providedIn: 'root'
})
export class RegionService {

  // private regions$ = new Subject<Region[]>();
  // private regionObservable$: Observable<Region[]>

  constructor(private http: HttpClient) {
  }

  getDefaultRegionFilterValue(): Region{
    let lsRegionValue = localStorage.getItem(RegionServiceConstants.regionService_ls_region_key);
    if(lsRegionValue){
      return Region[lsRegionValue];
    }
    return null;
  }

  setDefaultRegionFilterValue(val : Region): void{
    localStorage.setItem(RegionServiceConstants.regionService_ls_region_key, val.toString());
  }
  
  getRegions(): Observable<Region[]> {

    return this.http.get<Region[]>(RegionServiceConstants.serviceURL);
    // this.http.get<Region[]>(this.ServiceURL).subscribe(data => {
    //   this.regions$.next(data);
    // });

    // return this.regions$.asObservable();
  }
}
