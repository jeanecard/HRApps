import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaucisseComponent } from './saucisse.component';

describe('SaucisseComponent', () => {
  let component: SaucisseComponent;
  let fixture: ComponentFixture<SaucisseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaucisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaucisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
