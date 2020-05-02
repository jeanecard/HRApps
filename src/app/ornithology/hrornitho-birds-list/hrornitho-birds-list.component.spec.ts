import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HROrnithoBirdsListComponent } from './hrornitho-birds-list.component';

describe('HROrnithoBirdsListComponent', () => {
  let component: HROrnithoBirdsListComponent;
  let fixture: ComponentFixture<HROrnithoBirdsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HROrnithoBirdsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HROrnithoBirdsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
