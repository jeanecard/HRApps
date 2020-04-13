import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrWebCamSelectorComponent } from './hr-web-cam-selector.component';

describe('HrWebCamSelectorComponent', () => {
  let component: HrWebCamSelectorComponent;
  let fixture: ComponentFixture<HrWebCamSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrWebCamSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrWebCamSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
