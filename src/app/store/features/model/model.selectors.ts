import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey} from './model.reducer';
import {ModelState} from './model.state';

export const getModelState = createFeatureSelector<ModelState>(featureKey);

export const getModelsList = createSelector(
    getModelState,
    (state: ModelState) => state.models
);

export const getModelsTotal = createSelector(
    getModelState,
    (state: ModelState) => state.total
);

export const getIsLoading = createSelector(
    getModelState,
    (state: ModelState) => state.loading
);

export const getError = createSelector(
    getModelState,
    (state: ModelState) => state.error
);
