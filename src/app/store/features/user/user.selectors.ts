import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey} from './city.reducer';
import {CityState} from './city.state';

export const getCityState = createFeatureSelector<CityState>(featureKey);

export const getCitiesList = createSelector(
    getCityState,
    (state: CityState) => state.cities
);

export const getCitiesTotal = createSelector(
    getCityState,
    (state: CityState) => state.total
);

export const getIsLoading = createSelector(
    getCityState,
    (state: CityState) => state.loading
);

export const getError = createSelector(
    getCityState,
    (state: CityState) => state.error
);
