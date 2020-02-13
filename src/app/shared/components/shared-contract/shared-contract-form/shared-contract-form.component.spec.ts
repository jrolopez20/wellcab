import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedContractFormComponent } from './shared-contract-form.component';

describe('SharedContractFormComponent', () => {
  let component: SharedContractFormComponent;
  let fixture: ComponentFixture<SharedContractFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedContractFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedContractFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
