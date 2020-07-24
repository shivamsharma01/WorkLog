import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DevTaskComponent } from "./dev-task.component";

describe("DevTaskComponent", () => {
  let component: DevTaskComponent;
  let fixture: ComponentFixture<DevTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DevTaskComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
