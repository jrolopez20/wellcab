import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey} from './shared-contract.reducer';
import {SharedContractState} from './shared-contract.state';

export const getSharedContractState = createFeatureSelector<SharedContractState>(featureKey);

export const getSharedContractsList = createSelector(
    getSharedContractState,
    (state: SharedContractState) => state.sharedContracts
);

export const getSharedContractsTotal = createSelector(
    getSharedContractState,
    (state: SharedContractState) => state.total
);

export const getIsLoading = createSelector(
    getSharedContractState,
    (state: SharedContractState) => state.loading
);

export const getError = createSelector(
    getSharedContractState,
    (state: SharedContractState) => state.error
);
