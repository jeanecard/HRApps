import { Injectable } from '@angular/core';
import { MapLayerService } from './map-layer.service';
import { HRBorderFilterModel } from '../model/hrborder-filter-model';
import { HRCountryFilterPreferencesService } from './hrcountry-filter-preferences.service';

@Injectable({
  providedIn: 'root'
})
export class HRBorderFilterPreferencesService {

  constructor(private mapService : MapLayerService,private countryFilterPreferencesService : HRCountryFilterPreferencesService) {
    //Dummy.
   }
   public getDefaultValue(): HRBorderFilterModel {
    let countryFilterValue = this.countryFilterPreferencesService.getDefaultValue();
    return {
      countryFilter : countryFilterValue,
      map : this.mapService.getDefaultSourceName()
    };
  }
  public setDefaultValue(val : HRBorderFilterModel): void {
    this.countryFilterPreferencesService.setValue(val.countryFilter);
    this.mapService.setDefaultSource(val.map);
  }
}
