import {createAction, props} from '@ngrx/store';
import {Contract} from '@app/store/models/contract.model';

export const loadContractsRequest = createAction(
    '[Contract] Load Contracts Request',
    props<{ licenseId: number, sort: string, order: string, page: number, limit: number, filter?: string }>()
);

export const loadContractsCompleted = createAction(
    '[Contract] Load Contracts Completed',
    props<{ contracts: Contract[], total: number }>()
);

export const contractsError = createAction(
    '[Contract] Error',
    props<{ error: any }>()
);

export const addContractRequest = createAction(
    '[Contract] Add Contract Request',
    props<{ licenseId: number, contract: Contract }>()
);

export const addContractCompleted = createAction(
    '[Contract] Add Contract Completed',
    props<{ contract: Contract }>()
);

export const setContractRequest = createAction(
    '[Contract] Set Contract Request',
    props<{ licenseId: number, contract: Contract }>()
);

export const setContractCompleted = createAction(
    '[Contract] Set Contract Completed',
    props<{ contract: Contract }>()
);

export const closeContractRequest = createAction(
    '[Contract] Close Contract Request',
    props<{ licenseId: number }>()
);

export const closeContractCompleted = createAction(
    '[Contract] Close Contract Completed',
    props<{ contract: Contract }>()
);

