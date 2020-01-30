import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListDialogComponent } from './company-list-dialog.component';

describe('CompanyListDialogComponent', () => {
  let component: CompanyListDialogComponent;
  let fixture: ComponentFixture<CompanyListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
