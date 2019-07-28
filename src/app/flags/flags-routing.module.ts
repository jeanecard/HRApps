import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFlagsComponent } from './main-flags/main-flags.component';


const flagsRoutes: Routes = [
  { path: '', component: MainFlagsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(flagsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FlagsRoutingModule { }
