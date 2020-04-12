import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrLocatorSelectorComponent } from './hr-locator-selector.component';

describe('HrLocatorSelectorComponent', () => {
  let component: HrLocatorSelectorComponent;
  let fixture: ComponentFixture<HrLocatorSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrLocatorSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrLocatorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
