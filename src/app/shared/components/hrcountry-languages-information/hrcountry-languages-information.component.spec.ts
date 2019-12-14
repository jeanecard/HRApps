import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRCountryLanguagesInformationComponent } from './hrcountry-languages-information.component';

describe('HRCountryLanguagesInformationComponent', () => {
  let component: HRCountryLanguagesInformationComponent;
  let fixture: ComponentFixture<HRCountryLanguagesInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRCountryLanguagesInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRCountryLanguagesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
