import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCountriesComponent } from './main-countries/main-countries.component';

import { CountriesRoutingModule } from './countries-routing.module';


@NgModule({
  declarations: [MainCountriesComponent],
  imports: [
    CountriesRoutingModule,
    CommonModule,
  ],
  exports: [
    MainCountriesComponent
  ]
})
export class CountriesModule { }