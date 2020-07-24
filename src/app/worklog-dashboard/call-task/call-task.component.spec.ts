import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallTaskComponent } from './call-task.component';

describe('CallTaskComponent', () => {
  let component: CallTaskComponent;
  let fixture: ComponentFixture<CallTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
