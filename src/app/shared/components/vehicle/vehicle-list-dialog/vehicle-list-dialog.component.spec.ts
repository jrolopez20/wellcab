import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListDialogComponent } from './vehicle-list-dialog.component';

describe('VehicleListDialogComponent', () => {
  let component: VehicleListDialogComponent;
  let fixture: ComponentFixture<VehicleListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
