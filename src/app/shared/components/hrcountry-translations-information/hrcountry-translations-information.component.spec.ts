import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRCountryTranslationsInformationComponent } from './hrcountry-translations-information.component';

describe('HRCountryTranslationsInformationComponent', () => {
  let component: HRCountryTranslationsInformationComponent;
  let fixture: ComponentFixture<HRCountryTranslationsInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRCountryTranslationsInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRCountryTranslationsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
