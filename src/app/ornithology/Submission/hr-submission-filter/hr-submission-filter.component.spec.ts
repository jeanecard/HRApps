import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSubmissionFilterComponent } from './hr-submission-filter.component';

describe('HrSubmissionFilterComponent', () => {
  let component: HrSubmissionFilterComponent;
  let fixture: ComponentFixture<HrSubmissionFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrSubmissionFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrSubmissionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
