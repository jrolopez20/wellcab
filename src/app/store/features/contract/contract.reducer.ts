import {Action, createReducer, on} from '@ngrx/store';
import {ContractState, initialState} from './contract.state';
import * as ContractActions from './contract.actions';

export const featureKey = 'contract';

const contractReducer = createReducer(
    initialState,
    on(ContractActions.loadContractsRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(ContractActions.loadContractsCompleted,
        (state, {contracts, total}) => {
            return {
                ...state,
                contracts: [...contracts],
                total: total,
                loading: false,
                error: null
            };
        }
    ),
    on(ContractActions.contractsError,
        (state, {error}) => {
            return {
                ...state,
                error: error,
                loading: false
            };
        }
    ),
    on(ContractActions.addContractRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(ContractActions.addContractCompleted,
        (state) => {
            return {
                ...state,
                loading: false,
                error: null
            };
        }
    ),
    on(ContractActions.setContractRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(ContractActions.setContractCompleted,
        (state, {contract}) => {
            return {
                ...state,
                contracts: state.contracts ? state.contracts.map(u => {
                    if (u.id === contract.id) {
                        u = {...contract};
                    }
                    return u;
                }) : null,
                loading: false,
                error: null
            };
        }
    ),
    on(ContractActions.closeContractRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(ContractActions.closeContractCompleted,
        (state, {contract}) => {
            return {
                ...state,
                contracts: state.contracts ? state.contracts.map(u => {
                    if (u.id === contract.id) {
                        u = {...contract};
                    }
                    return u;
                }) : null,
                loading: false,
                error: null
            };
        }
    )
);

export function reducer(state: ContractState | undefined, action: Action) {
    return contractReducer(state, action);
}
