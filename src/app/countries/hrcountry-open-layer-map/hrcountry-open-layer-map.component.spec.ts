import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRCountryOpenLayerMapComponent } from './hrcountry-open-layer-map.component';

describe('HRCountryOpenLayerMapComponent', () => {
  let component: HRCountryOpenLayerMapComponent;
  let fixture: ComponentFixture<HRCountryOpenLayerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRCountryOpenLayerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRCountryOpenLayerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
