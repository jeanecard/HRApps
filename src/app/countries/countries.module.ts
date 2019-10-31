import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCountriesComponent } from './main-countries/main-countries.component';

import { CountriesRoutingModule } from './countries-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AngularMaterialBasicModule } from '../shared/angular-material-basic/angular-material-basic.module';
import { RootModule } from '../root/root.module';


@NgModule({
  declarations: [MainCountriesComponent],
  imports: [
    CountriesRoutingModule,
    CommonModule,
    LayoutModule,
    AngularMaterialBasicModule,
    RootModule
  ],
  exports: [
    MainCountriesComponent
  ]
})
export class CountriesModule { }