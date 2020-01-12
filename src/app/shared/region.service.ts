import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region } from 'src/app/model/region';
import { Observable } from 'rxjs';
import { HrStorageService } from './hr-storage.service';


export class RegionServiceConstants {
  static readonly SERVICE_URL = 'https://fullcoreservices-ci.azurewebsites.net/api/v1.0/HRContinent';
  static readonly STORAGE_REGION_KEY = 'region';
  static readonly SERVICE_ERROR = 'HRStorage is null, RegionService is not avaialble.';
  //private SERVICE_URL = 'http://localhost:50147/api/v1.0/HRContinent';
}
// Singleton regions Service
@Injectable({
  providedIn: 'root'
})
export class RegionService {

  // private regions$ = new Subject<Region[]>();
  // private regionObservable$: Observable<Region[]>

  constructor(
    private _http: HttpClient,
    private  _hrLocalStorage: HrStorageService) {
      //Dummy.
  }

  /**
   * Get in HRLocalStorage the saved Region. 
   * @return the saved Region or Region.All if the stored value does not match with a Region value.
   * @throws Error if HRStorage is not avaialble.
   */
  public getDefaultRegionFilterValue(): Region {
    if (this._hrLocalStorage) {
      let lsRegionValue = this._hrLocalStorage.getItem(RegionServiceConstants.STORAGE_REGION_KEY);
      if (lsRegionValue) {
        const convertedRegionValue: Region | undefined = (<any>Region)[lsRegionValue];
        if (convertedRegionValue !== undefined) {
          return Region[lsRegionValue];
        } else {
          return Region.All;
        }
      }
    }else{
      throw new Error(RegionServiceConstants.SERVICE_ERROR); 
    }
  }

  /**
   * Set in HRLocalStorage the saved Region. 
   * If the value can not be set, catch Exception and log but don't rethrow.
   *
   * @param val  The region to save in HRStorage
   *
   * @return nothing.
   * @throws nothing.
   */
  public setDefaultRegionFilterValue(val: Region): void {
    try{
    this._hrLocalStorage.setItem(RegionServiceConstants.STORAGE_REGION_KEY, val.toString());
    }
    catch{
      //Dummy.
    }
  }

  /**
 * Get Observable Regions. 
 * @return All Region as observable. Does not provide any processing on Error.
 */
  public getRegions(): Observable<Region[]> {
    return this._http.get<Region[]>(RegionServiceConstants.SERVICE_URL);
    // this.http.get<Region[]>(this.ServiceURL).subscribe(data => {
    //   this.regions$.next(data);
    // });

    // return this.regions$.asObservable();
  }
}
