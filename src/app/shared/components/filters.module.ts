import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { LanguageFilterComponent } from './language-filter/language-filter.component';
import { PopulationFilterComponent } from './population-filter/population-filter.component';
import { RegionFilterComponent } from './region-filter/region-filter.component';
import { AngularMaterialBasicModule } from '../angular-material-basic/angular-material-basic.module';
import { HRCountryFilterComponent } from './hrcountry-filter/hrcountry-filter.component';
import { HrOpenLayerMapComponent } from './hr-open-layer-map/hr-open-layer-map.component';
import { LayersSelectorComponent } from './layersSelector/layersSelector.component';
import { HrLocatorSelectorComponent } from './hr-locator-selector/hr-locator-selector.component';



@NgModule({
  declarations: [
  //  LanguageFilterComponent,
    PopulationFilterComponent,
    RegionFilterComponent,
    HRCountryFilterComponent,
    HrOpenLayerMapComponent,
    LayersSelectorComponent,
    HrLocatorSelectorComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialBasicModule
  ],
  exports: [
    //LanguageFilterComponent,
    PopulationFilterComponent,
    RegionFilterComponent,
    HRCountryFilterComponent,
    HrOpenLayerMapComponent,
    LayersSelectorComponent,
    HrLocatorSelectorComponent
  ]
})
export class FiltersModule { }
