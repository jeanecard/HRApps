import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDetailComponent } from './hr-detail.component';

describe('HrDetailComponent', () => {
  let component: HrDetailComponent;
  let fixture: ComponentFixture<HrDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
