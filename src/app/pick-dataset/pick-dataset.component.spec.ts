import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickDatasetComponent } from './pick-dataset.component';

describe('PickDatasetComponent', () => {
  let component: PickDatasetComponent;
  let fixture: ComponentFixture<PickDatasetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickDatasetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
