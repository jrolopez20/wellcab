import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCompaniesComponent } from './city-companies.component';

describe('CityCompaniesComponent', () => {
  let component: CityCompaniesComponent;
  let fixture: ComponentFixture<CityCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
