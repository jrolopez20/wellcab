import {Contract} from '@app/store/models/contract.model';

export interface ContractState {
    contracts: Contract[] | null;
    total: number;
    loading: boolean;
    error: any;
}

export const initialState: ContractState = {
    contracts: null,
    total: 0,
    loading: false,
    error: null
};
