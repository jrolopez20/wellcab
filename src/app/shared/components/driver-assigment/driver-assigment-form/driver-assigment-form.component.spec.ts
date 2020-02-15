import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverAssigmentFormComponent } from './driver-assigment-form.component';

describe('DriverAssigmentFormComponent', () => {
  let component: DriverAssigmentFormComponent;
  let fixture: ComponentFixture<DriverAssigmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverAssigmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverAssigmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
