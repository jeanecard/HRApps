import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRSubmitSoundComponent } from './hrsubmit-sound.component';

describe('HRSubmitSoundComponent', () => {
  let component: HRSubmitSoundComponent;
  let fixture: ComponentFixture<HRSubmitSoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRSubmitSoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRSubmitSoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
