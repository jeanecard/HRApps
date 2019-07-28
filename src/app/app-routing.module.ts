import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaucisseComponent } from './root/saucisse/saucisse.component';
import { HRDashBoardComponent } from './root/hrdash-board/hrdash-board.component';
import { NotFoundComponent } from './root/not-found/not-found.component';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';


const appRoutes: Routes = [
  {
    path: 'saucisse',
    component: SaucisseComponent,
  },
  {
    path: 'flags',
    loadChildren: () => import('./flags/flags.module').then(mod => mod.FlagsModule),
    data: { preload: false }
  },
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then(mod => mod.CountriesModule),
    data: { preload: false }
  },
  {
    path: 'ornithology',
    loadChildren: () => import('./ornithology/ornithology.module').then(mod => mod.OrnithologyModule),
    data: { preload: false }
  },
  {
    path: 'geolocator',
    loadChildren: () => import('./geo-locator/geo-locator.module').then(mod => mod.GeoLocatorModule),
    data: { preload: false }
  },
  { path: '', component: HRDashBoardComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only (From angular doc, thanks guys ;-)
        preloadingStrategy: SelectivePreloadingStrategyService,
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
