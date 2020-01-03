import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { PopulationFilterComponent } from './population-filter.component';
import {AngularMaterialBasicModule} from '../../angular-material-basic/angular-material-basic.module'
import {RootModule} from '../../../root/root.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';


describe('PopulationFilterComponent', () => {
  let component: PopulationFilterComponent;
  let fixture: ComponentFixture<PopulationFilterComponent>;

  beforeEach(() => {
    // Must reset the test environment before initializing it.
    TestBed.resetTestEnvironment();

    let tBed =  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    tBed.configureTestingModule({
        declarations: [ PopulationFilterComponent ],
        imports: [AngularMaterialBasicModule, RootModule, BrowserAnimationsModule]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(PopulationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.detectChanges
;
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should update the value of the input field', () => {
  //   const input = fixture.nativeElement.querySelector('input');
  //   const event = {event : 'dummy'};
  
  //   input.value = 10;
  //   //input.dispatchEvent(event);
  
  //   expect(fixture.componentInstance.amount.value).toEqual(10);
  // });

  // it('should update the value in the control', () => {
  //   component.populationFilterForm.setValue({amount:100000, over:true});
  
  //   const input = fixture.nativeElement.querySelector('mat-select');
  //   expect(10).toBe(10);
  //   //expect(component.amount.value).toBe(100000);
  // });

  it('contains list of blog items by default', () => {
    // ask the test bed to configure the components, and in a promise
    // provide the rest of our test.  Any failure that causes the promise
    // to fail (a failed test expectation) will fail the test.
    getTestBed().compileComponents().then(() => {
      // get a reference to the mock backend so we can respond with
      // fake data when it is fetched with Http.get
      let mockBackend = null;

      // now, ask the test bed to create our BlogRollComponent
      let fixture: ComponentFixture<PopulationFilterComponent> =
                   getTestBed().createComponent(PopulationFilterComponent);
      // there is no web browser, we must feed the lifecycle methods to it
      // so we access the "component" under test using componentInstance
      // and call the lifecycle method
      fixture.componentInstance.ngOnInit();
      // cause the Angular framework to detect any changes to the component
      fixture.detectChanges();
      //component.populationFilterForm.setValue(null);
      //expect(component.populationFilterForm.value).toBe(null);
      // now check the basic component state - we aren't editing a
      // blog entry yet, so we are only showing the blog roll
    });
  });

});
