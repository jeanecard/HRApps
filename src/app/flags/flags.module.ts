import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { AngularMaterialBasicModule } from '../Shared/angular-material-basic/angular-material-basic.module';

import { MainFlagsComponent } from './main-flags/main-flags.component';
import { FlagDetailComponent } from './flag-detail/flag-detail.component';
import { FlagsRoutingModule } from './flags-routing.module';
import { FlagsListComponent } from './flags-list/flags-list.component';

@NgModule({
  declarations: [
    MainFlagsComponent,
    FlagDetailComponent,
    FlagsListComponent],
  imports: [
    FlagsRoutingModule,
    CommonModule,
    LayoutModule,
    AngularMaterialBasicModule
  ],
  exports: [
    MainFlagsComponent,
    FlagDetailComponent
  ]
})
export class FlagsModule { }
