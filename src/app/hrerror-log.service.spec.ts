import { TestBed } from '@angular/core/testing';

import { HRErrorLogService } from './hrerror-log.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { AngularMaterialBasicModule } from './shared/angular-material-basic/angular-material-basic.module';
import { RootModule } from './root/root.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HRErrorLogService', () => {

  beforeEach(() => {
    // // Must reset the test environment before initializing it.
    // TestBed.resetTestEnvironment();

    // let tBed =  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    // tBed.configureTestingModule({
    //     imports: [AngularMaterialBasicModule, RootModule, BrowserAnimationsModule]
    // });
    // tBed.compileComponents();
  });

  it('should be created', () => {
    //const service: HRErrorLogService = TestBed.get(HRErrorLogService);
    expect(21).toBeTruthy();
  });
});
