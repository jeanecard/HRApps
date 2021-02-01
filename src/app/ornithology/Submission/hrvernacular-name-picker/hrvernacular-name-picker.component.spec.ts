import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRVernacularNamePickerComponent } from './hrvernacular-name-picker.component';

describe('HRVernacularNamePickerComponent', () => {
  let component: HRVernacularNamePickerComponent;
  let fixture: ComponentFixture<HRVernacularNamePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRVernacularNamePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRVernacularNamePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
