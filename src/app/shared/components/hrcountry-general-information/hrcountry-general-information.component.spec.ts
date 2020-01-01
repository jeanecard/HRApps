import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRCountryGeneralInformationComponent } from './hrcountry-general-information.component';

describe('HRCountryGeneralInformationComponent', () => {
  let component: HRCountryGeneralInformationComponent;
  let fixture: ComponentFixture<HRCountryGeneralInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRCountryGeneralInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRCountryGeneralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
