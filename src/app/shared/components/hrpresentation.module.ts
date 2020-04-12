import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HRCountryGeneralInformationComponent } from './hrcountry-general-information/hrcountry-general-information.component';
import { AngularMaterialBasicModule } from '../angular-material-basic/angular-material-basic.module';
import { HRCountryCurrenciesInformationComponent } from './hrcountry-currencies-information/hrcountry-currencies-information.component';
import { HRCountryLanguagesInformationComponent } from './hrcountry-languages-information/hrcountry-languages-information.component';
import { HRCountryTranslationsInformationComponent } from './hrcountry-translations-information/hrcountry-translations-information.component';


@NgModule({
  declarations: [
    HRCountryGeneralInformationComponent,
    HRCountryCurrenciesInformationComponent,
    HRCountryLanguagesInformationComponent,
    HRCountryTranslationsInformationComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialBasicModule
  ],
  exports: [
    HRCountryGeneralInformationComponent,
    HRCountryCurrenciesInformationComponent,
    HRCountryLanguagesInformationComponent,
    HRCountryTranslationsInformationComponent
  ]
})
export class HRPresentationModule { }
