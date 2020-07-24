import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogDashboardComponent } from './worklog-dashboard.component';

describe('WorklogDashboardComponent', () => {
  let component: WorklogDashboardComponent;
  let fixture: ComponentFixture<WorklogDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
