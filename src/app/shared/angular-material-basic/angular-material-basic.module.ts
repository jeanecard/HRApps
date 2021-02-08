import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // !TODO not angular material module
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatStepperModule} from '@angular/material/stepper';

import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatStepperModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatCheckboxModule,
    MatDialogModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatExpansionModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatDialogModule,
    MatTabsModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatCheckboxModule,
    MatDialogModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatExpansionModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule
  ],
})
export class AngularMaterialBasicModule { }
