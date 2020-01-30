import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCompanyFormComponent } from './city-company-form.component';

describe('CityCompanyFormComponent', () => {
  let component: CityCompanyFormComponent;
  let fixture: ComponentFixture<CityCompanyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityCompanyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityCompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
