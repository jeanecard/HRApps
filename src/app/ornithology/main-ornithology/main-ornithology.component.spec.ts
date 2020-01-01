import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOrnithologyComponent } from './main-ornithology.component';

describe('MainOrnithologyComponent', () => {
  let component: MainOrnithologyComponent;
  let fixture: ComponentFixture<MainOrnithologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainOrnithologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainOrnithologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
