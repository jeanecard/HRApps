import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPicturesComponent } from './hr-pictures.component';

describe('HrPicturesComponent', () => {
  let component: HrPicturesComponent;
  let fixture: ComponentFixture<HrPicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrPicturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
