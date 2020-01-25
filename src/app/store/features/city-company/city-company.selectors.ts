import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey} from './city-company.reducer';
import {CityCompanyState} from './city-company.state';

export const getCityCompanyState = createFeatureSelector<CityCompanyState>(featureKey);

export const getCityCompaniesList = createSelector(
    getCityCompanyState,
    (state: CityCompanyState) => state.cityCompanies
);

export const getCityCompaniesTotal = createSelector(
    getCityCompanyState,
    (state: CityCompanyState) => state.total
);

export const getIsLoading = createSelector(
    getCityCompanyState,
    (state: CityCompanyState) => state.loading
);

export const getError = createSelector(
    getCityCompanyState,
    (state: CityCompanyState) => state.error
);
