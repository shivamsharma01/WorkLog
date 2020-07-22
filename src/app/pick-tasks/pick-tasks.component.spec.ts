import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickTasksComponent } from './pick-tasks.component';

describe('PickTasksComponent', () => {
  let component: PickTasksComponent;
  let fixture: ComponentFixture<PickTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
