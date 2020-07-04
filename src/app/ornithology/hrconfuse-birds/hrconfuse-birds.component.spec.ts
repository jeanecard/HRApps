import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRConfuseBirdsComponent } from './hrconfuse-birds.component';

describe('HRConfuseBirdsComponent', () => {
  let component: HRConfuseBirdsComponent;
  let fixture: ComponentFixture<HRConfuseBirdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRConfuseBirdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRConfuseBirdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
