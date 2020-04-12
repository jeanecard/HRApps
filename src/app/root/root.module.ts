import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HRNavigationComponent } from './hrnavigation/hrnavigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AngularMaterialBasicModule } from '../shared/angular-material-basic/angular-material-basic.module';
import { HRDashBoardComponent } from './hrdash-board/hrdash-board.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotFoundComponent } from './not-found/not-found.component';
import { SaucisseComponent } from './saucisse/saucisse.component';


@NgModule({
  declarations: [HRNavigationComponent, HRDashBoardComponent, NotFoundComponent, SaucisseComponent],
  imports: [
    CommonModule,
    LayoutModule,
    AngularMaterialBasicModule,
    FlexLayoutModule,
    
  ],
  exports: [
    HRNavigationComponent,
    HRDashBoardComponent,
    NotFoundComponent
  ]
})
export class RootModule { }
