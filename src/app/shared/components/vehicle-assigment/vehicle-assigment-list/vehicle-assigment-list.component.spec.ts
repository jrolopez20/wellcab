import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAssigmentListComponent } from './vehicle-assigment-list.component';

describe('VehicleAssigmentListComponent', () => {
  let component: VehicleAssigmentListComponent;
  let fixture: ComponentFixture<VehicleAssigmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleAssigmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleAssigmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
