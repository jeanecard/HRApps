import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRConfirmDeletionComponent } from './hrconfirm-deletion.component';

describe('HRConfirmDeletionComponent', () => {
  let component: HRConfirmDeletionComponent;
  let fixture: ComponentFixture<HRConfirmDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRConfirmDeletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRConfirmDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
