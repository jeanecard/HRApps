import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainCountriesComponent } from './main-countries/main-countries.component';

const countriesRoutes: Routes = [
  { path: '', component: MainCountriesComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(countriesRoutes)
  ]
})
export class CountriesRoutingModule { }
