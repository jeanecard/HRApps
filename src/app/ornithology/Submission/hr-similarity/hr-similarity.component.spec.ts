import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSimilarityComponent } from './hr-similarity.component';

describe('HrSimilarityComponent', () => {
  let component: HrSimilarityComponent;
  let fixture: ComponentFixture<HrSimilarityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrSimilarityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrSimilarityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
