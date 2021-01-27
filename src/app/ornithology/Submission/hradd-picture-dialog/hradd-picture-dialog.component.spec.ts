import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRAddPictureDialogComponent } from './hradd-picture-dialog.component';

describe('HRAddPictureDialogComponent', () => {
  let component: HRAddPictureDialogComponent;
  let fixture: ComponentFixture<HRAddPictureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRAddPictureDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRAddPictureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
