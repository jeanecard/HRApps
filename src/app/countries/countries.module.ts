import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCountriesComponent } from './main-countries/main-countries.component';

import { CountriesRoutingModule } from './countries-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AngularMaterialBasicModule } from '../shared/angular-material-basic/angular-material-basic.module';
import { RootModule } from '../root/root.module';
import { FiltersModule } from '../shared/components/filters.module';
import { HRCountryOpenLayerMapComponent } from './hrcountry-open-layer-map/hrcountry-open-layer-map.component';
import { LayersSelectorComponent } from './layersSelector/layersSelector.component';


@NgModule({
  declarations: [
    MainCountriesComponent, 
    HRCountryOpenLayerMapComponent, 
    LayersSelectorComponent],
  imports: [
    CountriesRoutingModule,
    CommonModule,
    LayoutModule,
    AngularMaterialBasicModule,
    RootModule,
    FiltersModule,
  ],
  exports: [
    MainCountriesComponent
  ]
})
export class CountriesModule { }