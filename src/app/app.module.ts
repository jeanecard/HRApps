import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { RootModule } from './root/root.module';

import { build$ } from 'protractor/built/element';
import { AppRoutingModule } from './app-routing.module';

import { FormatNumberDirective } from './shared/format-number.directive';
import { HRErrorHandler } from './hrerror-handler';


@NgModule({
  declarations: [
    AppComponent,
    FormatNumberDirective
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    RootModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [{provide: ErrorHandler, useClass: HRErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
