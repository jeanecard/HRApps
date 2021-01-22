import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrornithoAdminComponent } from './hrornitho-admin.component';

describe('HrornithoAdminComponent', () => {
  let component: HrornithoAdminComponent;
  let fixture: ComponentFixture<HrornithoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrornithoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrornithoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
