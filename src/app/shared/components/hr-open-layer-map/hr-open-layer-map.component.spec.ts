import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrOpenLayerMapComponent } from './hr-open-layer-map.component';

describe('HrOpenLayerMapComponent', () => {
  let component: HrOpenLayerMapComponent;
  let fixture: ComponentFixture<HrOpenLayerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrOpenLayerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrOpenLayerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
