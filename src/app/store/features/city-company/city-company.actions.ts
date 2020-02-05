import {createAction, props} from '@ngrx/store';
import {CityCompany} from '@app/store/models/city-company.model';

export const loadCityCompanies = createAction(
    '[CityCompany] Load City Companies',
    props<{ cityId: number, sort: string, order: string, page: number, limit: number, filter?: string }>()
);

export const loadCityCompaniesSuccess = createAction(
    '[CityCompany] Load Cities Success',
    props<{ cityCompanies: CityCompany[], total: number }>()
);

export const cityCompaniesError = createAction(
    '[CityCompany] Error',
    props<{ error: any }>()
);

export const saveCityCompanyRequest = createAction(
    '[CityCompany] Save City Company Request',
    props<{ cityId: number,  cityCompany: CityCompany }>()
);

export const saveCityCompanyCompleted = createAction(
    '[CityCompany] Save City Company Completed',
    props<{ cityCompany: CityCompany }>()
);

export const deleteCityCompanyRequest = createAction(
    '[CityCompany] Delete City Company Request',
    props<{ cityId: number, cityCompanyId: number}>()
);

export const deleteCityCompanyCompleted = createAction(
    '[CityCompany] Delete City Company Completed',
    props<{ cityCompany: CityCompany }>()
);
