import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HROrnithoBirdsDetailTechnicalsComponent } from './hrornitho-birds-detail-technicals.component';

describe('HROrnithoBirdsDetailTechnicalsComponent', () => {
  let component: HROrnithoBirdsDetailTechnicalsComponent;
  let fixture: ComponentFixture<HROrnithoBirdsDetailTechnicalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HROrnithoBirdsDetailTechnicalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HROrnithoBirdsDetailTechnicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
