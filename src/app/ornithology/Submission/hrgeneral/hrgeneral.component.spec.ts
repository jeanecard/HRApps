import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrgeneralComponent } from './hrgeneral.component';

describe('HrgeneralComponent', () => {
  let component: HrgeneralComponent;
  let fixture: ComponentFixture<HrgeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrgeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrgeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
