import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverAssigmentListComponent } from './driver-assigment-list.component';

describe('DriverAssigmentListComponent', () => {
  let component: DriverAssigmentListComponent;
  let fixture: ComponentFixture<DriverAssigmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverAssigmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverAssigmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
