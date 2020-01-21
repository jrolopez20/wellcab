import {createFeatureSelector, createSelector,} from '@ngrx/store';
import {featureKey} from './auth.reducer';
import {AuthState} from './auth.state';

export const getAuthState = createFeatureSelector<AuthState>(featureKey);

export const getUser = createSelector(
    getAuthState,
    (state: AuthState) => state.user
);

export const getIsLoggedIn = createSelector(
    getAuthState,
    (state: AuthState) => state.isLoggedIn
);

export const getIsLoading = createSelector(
    getAuthState,
    (state: AuthState) => state.loading
);

export const getError = createSelector(
    getAuthState,
    (state: AuthState) => state.error
);
