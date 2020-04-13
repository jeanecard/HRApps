import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainGeoLocatorComponent } from './main-geo-locator/main-geo-locator.component';
import { GeoLocatorRoutingModule } from './geo-locator-routing.module';
import { AngularMaterialBasicModule } from '../shared/angular-material-basic/angular-material-basic.module';
import { FiltersModule } from '../shared/components/filters.module';
import { HrWebCamSelectorComponent } from './hr-web-cam-selector/hr-web-cam-selector.component';

@NgModule({
  declarations: [MainGeoLocatorComponent, HrWebCamSelectorComponent],
  imports: [
    GeoLocatorRoutingModule,
    CommonModule,
    AngularMaterialBasicModule,
    FiltersModule
  ],
  exports: [
    MainGeoLocatorComponent
  ]
})
export class GeoLocatorModule { }
