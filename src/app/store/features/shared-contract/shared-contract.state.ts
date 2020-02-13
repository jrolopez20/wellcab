import {SharedContract} from '@app/store/models/shared-contract.model';

export interface SharedContractState {
    sharedContracts: SharedContract[] | null;
    total: number;
    loading: boolean;
    error: any;
}

export const initialState: SharedContractState = {
    sharedContracts: null,
    total: 0,
    loading: false,
    error: null
};
