import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCompaniesListComponent } from './city-companies-list.component';

describe('CityCompaniesListComponent', () => {
  let component: CityCompaniesListComponent;
  let fixture: ComponentFixture<CityCompaniesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityCompaniesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityCompaniesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
