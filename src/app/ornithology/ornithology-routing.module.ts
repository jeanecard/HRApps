import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainOrnithologyComponent } from './main-ornithology/main-ornithology.component';

const ornithologyRoutes: Routes = [
  { path: '', component: MainOrnithologyComponent },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ornithologyRoutes)
  ]
})
export class OrnithologyRoutingModule { }
