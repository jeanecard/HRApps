import { NgModule } from '@angular/core';
import { MainOrnithologyComponent } from './main-ornithology/main-ornithology.component';
import { OrnithologyRoutingModule } from './ornithology-routing.module';

@NgModule({
  declarations: [MainOrnithologyComponent],
  imports: [
    OrnithologyRoutingModule
  ],
  exports: [
    MainOrnithologyComponent
  ]
})
export class OrnithologyModule { }
