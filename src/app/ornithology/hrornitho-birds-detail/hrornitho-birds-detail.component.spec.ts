import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HROrnithoBirdsDetailComponent } from './hrornitho-birds-detail.component';

describe('HROrnithoBirdsDetailComponent', () => {
  let component: HROrnithoBirdsDetailComponent;
  let fixture: ComponentFixture<HROrnithoBirdsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HROrnithoBirdsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HROrnithoBirdsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
