import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAssigmentFormComponent } from './vehicle-assigment-form.component';

describe('VehicleAssigmentFormComponent', () => {
  let component: VehicleAssigmentFormComponent;
  let fixture: ComponentFixture<VehicleAssigmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleAssigmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleAssigmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
