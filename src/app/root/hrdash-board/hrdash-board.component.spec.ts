import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRDashBoardComponent } from './hrdash-board.component';

describe('HRDashBoardComponent', () => {
  let component: HRDashBoardComponent;
  let fixture: ComponentFixture<HRDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
