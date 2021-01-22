import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HROrnithoMapComponent } from './hrornitho-map.component';

describe('HROrnithoMapComponent', () => {
  let component: HROrnithoMapComponent;
  let fixture: ComponentFixture<HROrnithoMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HROrnithoMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HROrnithoMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
