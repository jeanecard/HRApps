import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRSubmitPictureComponent } from './hrsubmit-picture.component';

describe('HRSubmitPictureComponent', () => {
  let component: HRSubmitPictureComponent;
  let fixture: ComponentFixture<HRSubmitPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRSubmitPictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRSubmitPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
