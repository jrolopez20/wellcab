import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey} from './user.reducer';
import {UserState} from './user.state';

export const getUserState = createFeatureSelector<UserState>(featureKey);

export const getUsersList = createSelector(
    getUserState,
    (state: UserState) => state.users
);

export const getUsersTotal = createSelector(
    getUserState,
    (state: UserState) => state.total
);

export const getIsLoading = createSelector(
    getUserState,
    (state: UserState) => state.loading
);

export const getError = createSelector(
    getUserState,
    (state: UserState) => state.error
);

export const getCurrentUser = createSelector(
    getUserState,
    (state: UserState) => state.currentUser
);
