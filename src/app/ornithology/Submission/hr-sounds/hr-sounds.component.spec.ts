import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSoundsComponent } from './hr-sounds.component';

describe('HrSoundsComponent', () => {
  let component: HrSoundsComponent;
  let fixture: ComponentFixture<HrSoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrSoundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrSoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
