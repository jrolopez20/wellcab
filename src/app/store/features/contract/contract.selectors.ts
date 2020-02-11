import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey} from './contract.reducer';
import {ContractState} from './contract.state';

export const getContractState = createFeatureSelector<ContractState>(featureKey);

export const getContractsList = createSelector(
    getContractState,
    (state: ContractState) => state.contracts
);

export const getContractsTotal = createSelector(
    getContractState,
    (state: ContractState) => state.total
);

export const getIsLoading = createSelector(
    getContractState,
    (state: ContractState) => state.loading
);

export const getError = createSelector(
    getContractState,
    (state: ContractState) => state.error
);
