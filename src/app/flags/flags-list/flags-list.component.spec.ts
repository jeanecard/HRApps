import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsListComponent } from './flags-list.component';

describe('FlagsListComponent', () => {
  let component: FlagsListComponent;
  let fixture: ComponentFixture<FlagsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
