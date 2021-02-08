import { NgModule } from '@angular/core';
import { MainOrnithologyComponent } from './main-ornithology/main-ornithology.component';
import { OrnithologyRoutingModule } from './ornithology-routing.module';
import { HROrnithoMapComponent } from './Map/hrornitho-map/hrornitho-map.component';
import { HROrnithoBirdsListComponent } from './Browser/hrornitho-birds-list/hrornitho-birds-list.component';
import { HROrnithoBirdsDetailComponent } from './Browser/hrornitho-birds-detail/hrornitho-birds-detail.component';
import { HROrnithoBirdsDetailPicturesComponent } from './Browser/hrornitho-birds-detail-pictures/hrornitho-birds-detail-pictures.component';
import { HROrnithoBirdsDetailSongsComponent } from './Browser/hrornitho-birds-detail-songs/hrornitho-birds-detail-songs.component';
import { HROrnithoBirdsDetailTechnicalsComponent } from './Browser/hrornitho-birds-detail-technicals/hrornitho-birds-detail-technicals.component';
import { AngularMaterialBasicModule } from '../shared/angular-material-basic/angular-material-basic.module';
import { CommonModule } from '@angular/common';
import { HROrnithoMapFiltersComponent } from './Map/hrornitho-map-filters/hrornitho-map-filters.component';
import { HROrnithoDatabaseFiltersComponent } from './Browser/hrornitho-database-filters/hrornitho-database-filters.component';
import { HRConfuseBirdsComponent } from './Browser/hrconfuse-birds/hrconfuse-birds.component';
import { HrornithoAdminComponent } from './Submission/hrornitho-admin/hrornitho-admin.component';
import { HrgeneralComponent } from './Submission/hrgeneral/hrgeneral.component';
import { HrDetailComponent } from './Submission/hr-detail/hr-detail.component';
import { HrSoundsComponent } from './Submission/hr-sounds/hr-sounds.component';
import { HrPicturesComponent } from './Submission/hr-pictures/hr-pictures.component';
import { HrSimilarityComponent } from './Submission/hr-similarity/hr-similarity.component';
import { HrSubmissionFilterComponent } from './Submission/hr-submission-filter/hr-submission-filter.component';
import { HRSubmitPictureComponent } from './Submission/hrsubmit-picture/hrsubmit-picture.component';
import { HRSubmitSoundComponent } from './Submission/hrsubmit-sound/hrsubmit-sound.component';
import { HRAddPictureDialogComponent } from './Submission/hradd-picture-dialog/hradd-picture-dialog.component';
import { HRVernacularNamePickerComponent } from './Submission/hrvernacular-name-picker/hrvernacular-name-picker.component';
import { HRConfirmDeletionComponent } from '../shared/components/hrconfirm-deletion/hrconfirm-deletion.component';

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
    HRConfirmDeletionComponent,
    HROrnithoDatabaseFiltersComponent, HRConfuseBirdsComponent, HrornithoAdminComponent, HrgeneralComponent, HrDetailComponent, HrSoundsComponent, HrPicturesComponent, HrSimilarityComponent, HrSubmissionFilterComponent, HRSubmitPictureComponent, HRSubmitSoundComponent, HRAddPictureDialogComponent, HRVernacularNamePickerComponent],
  
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
