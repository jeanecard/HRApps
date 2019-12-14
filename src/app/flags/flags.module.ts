import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { AngularMaterialBasicModule } from '../shared/angular-material-basic/angular-material-basic.module';

import { MainFlagsComponent } from './main-flags/main-flags.component';
import { FlagDetailComponent } from './flag-detail/flag-detail.component';
import { FlagsRoutingModule } from './flags-routing.module';
import { FlagsListComponent } from './flags-list/flags-list.component';
import { FiltersModule } from '../shared/components/filters.module';
import { HRPresentationModule } from '../shared/components/hrpresentation.module';

@NgModule({
  declarations: [
    MainFlagsComponent,
    FlagDetailComponent,
    FlagsListComponent,
  ],
  entryComponents: [FlagDetailComponent],
  imports: [
    FlagsRoutingModule,
    CommonModule,
    LayoutModule,
    AngularMaterialBasicModule,
    FiltersModule,
    HRPresentationModule
  ],
  exports: [
    MainFlagsComponent,
    FlagDetailComponent
  ]
})
export class FlagsModule { }
