import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageFilterComponent } from './language-filter/language-filter.component';
import { PopulationFilterComponent } from './population-filter/population-filter.component';
import { RegionFilterComponent } from './region-filter/region-filter.component';
import { AngularMaterialBasicModule } from '../angular-material-basic/angular-material-basic.module';



@NgModule({
  declarations: [
    LanguageFilterComponent,
    PopulationFilterComponent,
    RegionFilterComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialBasicModule
  ],
  exports: [
    LanguageFilterComponent,
    PopulationFilterComponent,
    RegionFilterComponent
  ]
})
export class FiltersModule { }
