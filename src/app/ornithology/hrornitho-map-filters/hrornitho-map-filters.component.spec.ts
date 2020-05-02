import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HROrnithoMapFiltersComponent } from './hrornitho-map-filters.component';

describe('HROrnithoMapFiltersComponent', () => {
  let component: HROrnithoMapFiltersComponent;
  let fixture: ComponentFixture<HROrnithoMapFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HROrnithoMapFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HROrnithoMapFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
