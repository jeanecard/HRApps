import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HROrnithoDatabaseFiltersComponent } from './hrornitho-database-filters.component';

describe('HROrnithoDatabaseFiltersComponent', () => {
  let component: HROrnithoDatabaseFiltersComponent;
  let fixture: ComponentFixture<HROrnithoDatabaseFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HROrnithoDatabaseFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HROrnithoDatabaseFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
