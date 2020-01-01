import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRCountryFilterComponent } from './hrcountry-filter.component';

describe('HRCountryFilterComponent', () => {
  let component: HRCountryFilterComponent;
  let fixture: ComponentFixture<HRCountryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRCountryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRCountryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
