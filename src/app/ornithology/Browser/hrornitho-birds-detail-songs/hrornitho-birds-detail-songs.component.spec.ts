import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HROrnithoBirdsDetailSongsComponent } from './hrornitho-birds-detail-songs.component';

describe('HROrnithoBirdsDetailSongsComponent', () => {
  let component: HROrnithoBirdsDetailSongsComponent;
  let fixture: ComponentFixture<HROrnithoBirdsDetailSongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HROrnithoBirdsDetailSongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HROrnithoBirdsDetailSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
