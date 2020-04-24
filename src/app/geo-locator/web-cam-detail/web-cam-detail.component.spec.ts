import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCamDetailComponent } from './web-cam-detail.component';

describe('WebCamDetailComponent', () => {
  let component: WebCamDetailComponent;
  let fixture: ComponentFixture<WebCamDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebCamDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebCamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
