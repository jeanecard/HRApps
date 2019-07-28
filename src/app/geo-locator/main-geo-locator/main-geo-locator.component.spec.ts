import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGeoLocatorComponent } from './main-geo-locator.component';

describe('MainGeoLocatorComponent', () => {
  let component: MainGeoLocatorComponent;
  let fixture: ComponentFixture<MainGeoLocatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainGeoLocatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGeoLocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
