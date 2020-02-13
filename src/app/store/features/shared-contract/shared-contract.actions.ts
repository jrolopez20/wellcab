import {createAction, props} from '@ngrx/store';
import {SharedContract} from '@app/store/models/shared-contract.model';

export const loadSharedContractsRequest = createAction(
    '[SharedContract] Load SharedContracts',
    props<{ licenseId: number, contractId: number, sort: string, order: string, page: number, limit: number, filter?: string }>()
);

export const loadSharedContractsCompleted = createAction(
    '[SharedContract] Load SharedContracts Completed',
    props<{ sharedContracts: SharedContract[], total: number }>()
);

export const sharedContractsError = createAction(
    '[SharedContract] Error',
    props<{ error: any }>()
);

export const addSharedContractRequest = createAction(
    '[SharedContract] Add SharedContract Request',
    props<{ licenseId: number, sharedContract: SharedContract }>()
);

export const addSharedContractCompleted = createAction(
    '[SharedContract] Add SharedContract Completed',
    props<{ sharedContract: SharedContract }>()
);

export const setSharedContractRequest = createAction(
    '[SharedContract] Set SharedContract Request',
    props<{ licenseId: number, sharedContract: SharedContract }>()
);

export const setSharedContractCompleted = createAction(
    '[SharedContract] Set SharedContract Completed',
    props<{ sharedContract: SharedContract }>()
);

export const closeSharedContractRequest = createAction(
    '[SharedContract] Close SharedContract Request',
    props<{ licenseId: number }>()
);

export const closeSharedContractCompleted = createAction(
    '[SharedContract] Close SharedContract Completed',
    props<{ sharedContract: SharedContract }>()
);

export const clearStore = createAction(
    '[SharedContract] Clear Store'
);
