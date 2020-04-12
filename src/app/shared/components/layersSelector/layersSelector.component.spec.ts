import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayersSelectorComponent } from './layersSelector.component';

describe('SourceselectorComponent', () => {
  let component: LayersSelectorComponent;
  let fixture: ComponentFixture<LayersSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayersSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
