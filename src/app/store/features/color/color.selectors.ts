import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey} from './color.reducer';
import {ColorState} from './color.state';
import {Color} from '@app/store/models/color.model';

export const getColorState = createFeatureSelector<ColorState>(featureKey);

export const getColorsList = createSelector(
    getColorState,
    (state: ColorState) => state.colors
);

export const getColorsTotal = createSelector(
    getColorState,
    (state: ColorState) => state.total
);

export const getIsLoading = createSelector(
    getColorState,
    (state: ColorState) => state.loading
);

export const getError = createSelector(
    getColorState,
    (state: ColorState) => state.error
);
