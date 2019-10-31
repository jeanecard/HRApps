import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainGeoLocatorComponent } from './main-geo-locator/main-geo-locator.component';
import { GeoLocatorRoutingModule } from './geo-locator-routing.module';
import { AngularMaterialBasicModule } from '../shared/angular-material-basic/angular-material-basic.module';

@NgModule({
  declarations: [MainGeoLocatorComponent],
  imports: [
    GeoLocatorRoutingModule,
    CommonModule,
    AngularMaterialBasicModule
  ],
  exports: [
    MainGeoLocatorComponent
  ]
})
export class GeoLocatorModule { }
