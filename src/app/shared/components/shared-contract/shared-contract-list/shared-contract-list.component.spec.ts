import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedContractListComponent } from './shared-contract-list.component';

describe('SharedContractListComponent', () => {
  let component: SharedContractListComponent;
  let fixture: ComponentFixture<SharedContractListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedContractListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
