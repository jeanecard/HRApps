import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainGeoLocatorComponent } from './main-geo-locator/main-geo-locator.component';
import { GeoLocatorRoutingModule } from './geo-locator-routing.module';

@NgModule({
  declarations: [MainGeoLocatorComponent],
  imports: [
    GeoLocatorRoutingModule,
    CommonModule,
  ],
  exports: [
    MainGeoLocatorComponent
  ]
})
export class GeoLocatorModule { }
