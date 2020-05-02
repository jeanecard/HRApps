import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HROrnithoBirdsDetailPicturesComponent } from './hrornitho-birds-detail-pictures.component';

describe('HROrnithoBirdsDetailPicturesComponent', () => {
  let component: HROrnithoBirdsDetailPicturesComponent;
  let fixture: ComponentFixture<HROrnithoBirdsDetailPicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HROrnithoBirdsDetailPicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HROrnithoBirdsDetailPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
