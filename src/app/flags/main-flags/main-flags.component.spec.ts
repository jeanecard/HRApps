import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFlagsComponent } from './main-flags.component';

describe('MainFlagsComponent', () => {
  let component: MainFlagsComponent;
  let fixture: ComponentFixture<MainFlagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainFlagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
