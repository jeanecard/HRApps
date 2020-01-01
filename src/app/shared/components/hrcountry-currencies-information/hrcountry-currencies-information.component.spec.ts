import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRCountryCurrenciesInformationComponent } from './hrcountry-currencies-information.component';

describe('HRCountryCurrenciesInformationComponent', () => {
  let component: HRCountryCurrenciesInformationComponent;
  let fixture: ComponentFixture<HRCountryCurrenciesInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRCountryCurrenciesInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRCountryCurrenciesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
