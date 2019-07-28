import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainGeoLocatorComponent } from './main-geo-locator/main-geo-locator.component';

const geoLocatorRoutes: Routes = [
  { path: '', component: MainGeoLocatorComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(geoLocatorRoutes)
  ]
})
export class GeoLocatorRoutingModule { }
