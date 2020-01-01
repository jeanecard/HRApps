import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopulationFilterComponent } from './population-filter.component';
import {AngularMaterialBasicModule} from '../../angular-material-basic/angular-material-basic.module'
import {RootModule} from '../../../root/root.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('PopulationFilterComponent', () => {
  let component: PopulationFilterComponent;
  let fixture: ComponentFixture<PopulationFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopulationFilterComponent ],
      imports: [AngularMaterialBasicModule, RootModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should update the value of the input field', () => {
  //   const input = fixture.nativeElement.querySelector('input');
  //   const event = {event : 'dummy'};
  
  //   input.value = 10;
  //   //input.dispatchEvent(event);
  
  //   expect(fixture.componentInstance.amount.value).toEqual(10);
  // });

  it('should update the value in the control', () => {
    component.populationFilterForm.setValue({amount:100000, over:true});
  
    const input = fixture.nativeElement.querySelector('mat-slide-toggle');
    console.log('-------');
    console.log(input);
    //expect(input.value).toBe(10);
    expect(component.amount.value).toBe(100000);
  });

});
