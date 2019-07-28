import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HRNavigationComponent } from './hrnavigation/hrnavigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HRDashBoardComponent } from './hrdash-board/hrdash-board.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotFoundComponent } from './not-found/not-found.component';
import { SaucisseComponent } from './saucisse/saucisse.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [HRNavigationComponent, HRDashBoardComponent, NotFoundComponent, SaucisseComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FlexLayoutModule
  ],
  exports: [
    HRNavigationComponent,
    HRDashBoardComponent,
    NotFoundComponent
  ]
})
export class RootModule { }
