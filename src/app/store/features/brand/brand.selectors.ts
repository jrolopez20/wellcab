import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey} from './brand.reducer';
import {BrandState} from './brand.state';

export const getBrandState = createFeatureSelector<BrandState>(featureKey);

export const getBrandsList = createSelector(
    getBrandState,
    (state: BrandState) => state.brands
);

export const getBrandsTotal = createSelector(
    getBrandState,
    (state: BrandState) => state.total
);

export const getIsLoading = createSelector(
    getBrandState,
    (state: BrandState) => state.loading
);

export const getError = createSelector(
    getBrandState,
    (state: BrandState) => state.error
);
