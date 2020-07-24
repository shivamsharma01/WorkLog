import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionTaskComponent } from './discussion-task.component';

describe('DiscussionTaskComponent', () => {
  let component: DiscussionTaskComponent;
  let fixture: ComponentFixture<DiscussionTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
