import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey} from './license.reducer';
import {LicenseState} from './license.state';

export const getLicenseState = createFeatureSelector<LicenseState>(featureKey);

export const getLicensesList = createSelector(
    getLicenseState,
    (state: LicenseState) => state.licenses
);

export const getLicensesTotal = createSelector(
    getLicenseState,
    (state: LicenseState) => state.total
);

export const getIsLoading = createSelector(
    getLicenseState,
    (state: LicenseState) => state.loading
);

export const getError = createSelector(
    getLicenseState,
    (state: LicenseState) => state.error
);
