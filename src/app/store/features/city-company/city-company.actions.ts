import {createAction, props} from '@ngrx/store';
import {CityCompany} from '@app/store/models/city-company.model';

export const loadCityCompanies = createAction(
    '[CityCompany] Load City Companies',
    props<{ city: number, sort: string, order: string, page: number, filter?: string }>()
);

export const loadCityCompaniesSuccess = createAction(
    '[CityCompany] Load Cities Success',
    props<{ cityCompanies: CityCompany[], total: number }>()
);

export const cityCompaniesError = createAction(
    '[CityCompany] Error',
    props<{ error: any }>()
);

export const addCityCompanyRequest = createAction(
    '[CityCompany] Add City Company Request',
    props<{ cityCompany?: CityCompany }>()
);

export const addCityCompanyCompleted = createAction(
    '[CityCompany] Add City Company Completed',
    props<{ cityCompany: CityCompany }>()
);

export const setCityCompanyRequest = createAction(
    '[CityCompany] Set City Company Request',
    props<{ cityCompany: CityCompany }>()
);

export const setCityCompanyCompleted = createAction(
    '[CityCompany] Set City Company Completed',
    props<{ cityCompany: CityCompany }>()
);

export const deleteCityCompanyRequest = createAction(
    '[CityCompany] Delete City Company Request',
    props<{ cityCompany: CityCompany }>()
);

export const deleteCityCompanyCompleted = createAction(
    '[CityCompany] Delete City Company Completed',
    props<{ cityCompany: CityCompany }>()
);
