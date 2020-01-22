import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey} from './company.reducer';
import {CompanyState} from './company.state';

export const getCompanyState = createFeatureSelector<CompanyState>(featureKey);

export const getCompaniesList = createSelector(
    getCompanyState,
    (state: CompanyState) => state.companies
);

export const getCompaniesTotal = createSelector(
    getCompanyState,
    (state: CompanyState) => state.total
);

export const getIsLoading = createSelector(
    getCompanyState,
    (state: CompanyState) => state.loading
);

export const getError = createSelector(
    getCompanyState,
    (state: CompanyState) => state.error
);
