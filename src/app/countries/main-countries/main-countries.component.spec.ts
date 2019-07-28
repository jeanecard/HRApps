import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCountriesComponent } from './main-countries.component';

describe('MainCountriesComponent', () => {
  let component: MainCountriesComponent;
  let fixture: ComponentFixture<MainCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
