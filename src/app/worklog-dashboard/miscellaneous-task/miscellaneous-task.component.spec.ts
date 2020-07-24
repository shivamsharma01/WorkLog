import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousTaskComponent } from './miscellaneous-task.component';

describe('MiscellaneousTaskComponent', () => {
  let component: MiscellaneousTaskComponent;
  let fixture: ComponentFixture<MiscellaneousTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
