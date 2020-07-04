import { NgModule } from '@angular/core';
import { MainOrnithologyComponent } from './main-ornithology/main-ornithology.component';
import { OrnithologyRoutingModule } from './ornithology-routing.module';
import { HROrnithoMapComponent } from './hrornitho-map/hrornitho-map.component';
import { HROrnithoBirdsListComponent } from './hrornitho-birds-list/hrornitho-birds-list.component';
import { HROrnithoBirdsDetailComponent } from './hrornitho-birds-detail/hrornitho-birds-detail.component';
import { HROrnithoBirdsDetailPicturesComponent } from './hrornitho-birds-detail-pictures/hrornitho-birds-detail-pictures.component';
import { HROrnithoBirdsDetailSongsComponent } from './hrornitho-birds-detail-songs/hrornitho-birds-detail-songs.component';
import { HROrnithoBirdsDetailTechnicalsComponent } from './hrornitho-birds-detail-technicals/hrornitho-birds-detail-technicals.component';
import { AngularMaterialBasicModule } from '../shared/angular-material-basic/angular-material-basic.module';
import { CommonModule } from '@angular/common';
import { HROrnithoMapFiltersComponent } from './hrornitho-map-filters/hrornitho-map-filters.component';
import { HROrnithoDatabaseFiltersComponent } from './hrornitho-database-filters/hrornitho-database-filters.component';
import { HRConfuseBirdsComponent } from './hrconfuse-birds/hrconfuse-birds.component';

@NgModule({
  declarations: [
    MainOrnithologyComponent, 
    HROrnithoMapComponent, 
    HROrnithoBirdsListComponent, 
    HROrnithoBirdsDetailComponent, 
    HROrnithoBirdsDetailPicturesComponent, 
    HROrnithoBirdsDetailSongsComponent, 
    HROrnithoBirdsDetailTechnicalsComponent, 
    HROrnithoMapFiltersComponent, 
    HROrnithoDatabaseFiltersComponent, HRConfuseBirdsComponent],
  
  imports: [
    OrnithologyRoutingModule,
    AngularMaterialBasicModule,
    CommonModule
  ],
  entryComponents: [HROrnithoBirdsDetailComponent],
  exports: [
    MainOrnithologyComponent,
    HROrnithoBirdsDetailComponent
  ]
})
export class OrnithologyModule { }
