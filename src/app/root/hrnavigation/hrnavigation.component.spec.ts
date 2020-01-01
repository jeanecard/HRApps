import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRNavigationComponent } from './hrnavigation.component';

describe('HRNavigationComponent', () => {
  let component: HRNavigationComponent;
  let fixture: ComponentFixture<HRNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
