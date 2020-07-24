import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryDisplayComponent } from './entry-display.component';

describe('EntryDisplayComponent', () => {
  let component: EntryDisplayComponent;
  let fixture: ComponentFixture<EntryDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
