import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { LanguageFilterComponent } from './language-filter/language-filter.component';
import { PopulationFilterComponent } from './population-filter/population-filter.component';
import { RegionFilterComponent } from './region-filter/region-filter.component';
import { AngularMaterialBasicModule } from '../angular-material-basic/angular-material-basic.module';
import { HRCountryFilterComponent } from './hrcountry-filter/hrcountry-filter.component';



@NgModule({
  declarations: [
  //  LanguageFilterComponent,
    PopulationFilterComponent,
    RegionFilterComponent,
    HRCountryFilterComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialBasicModule
  ],
  exports: [
    //LanguageFilterComponent,
    PopulationFilterComponent,
    RegionFilterComponent,
    HRCountryFilterComponent
  ]
})
export class FiltersModule { }
