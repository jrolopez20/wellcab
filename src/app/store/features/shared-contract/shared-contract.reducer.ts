import {Action, createReducer, on} from '@ngrx/store';
import {SharedContractState, initialState} from './shared-contract.state';
import * as SharedContractActions from './shared-contract.actions';

export const featureKey = 'vehicleAssigment';

const sharedContractReducer = createReducer(
    initialState,
    on(SharedContractActions.loadSharedContractsRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(SharedContractActions.loadSharedContractsCompleted,
        (state, {sharedContracts, total}) => {
            return {
                ...state,
                sharedContracts: [...sharedContracts],
                total: total,
                loading: false,
                error: null
            };
        }),
    on(SharedContractActions.sharedContractsError,
        (state, {error}) => {
            return {
                ...state,
                error: error,
                loading: false
            };
        }),
    on(SharedContractActions.addSharedContractRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(SharedContractActions.addSharedContractCompleted,
        (state) => {
            return {
                ...state,
                loading: false,
                error: null
            };
        }),
    on(SharedContractActions.setSharedContractRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(SharedContractActions.setSharedContractCompleted,
        (state, {sharedContract}) => {
            return {
                ...state,
                sharedContracts: updateSharedContracts(state.sharedContracts, sharedContract),
                loading: false,
                error: null
            };
        }),
    on(SharedContractActions.closeSharedContractRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(SharedContractActions.closeSharedContractCompleted,
        (state, {sharedContract}) => {
            return {
                ...state,
                sharedContracts: updateSharedContracts(state.sharedContracts, sharedContract),
                loading: false,
                error: null
            };
        }),
    on(SharedContractActions.clearStore,
        () => {
            return {
                ...initialState
            };
        })
);

/**
 * Update the shared contract list
 * @param sharedContracts
 * @param sharedContract
 */
const updateSharedContracts = (sharedContracts, sharedContract) => {
    return [...sharedContracts].map(item => {
        if (item.id === sharedContract.id) {
            return {...sharedContract};
        }
        return item;
    });
};

export function reducer(state: SharedContractState | undefined, action: Action) {
    return sharedContractReducer(state, action);
}
