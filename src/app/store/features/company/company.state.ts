import {Company} from '@app/store/models/company.model';

export interface CompanyState {
    companies: Company[] | null;
    total: number;
    loading: boolean;
    error: any;
}

export const initialState: CompanyState = {
    companies: null,
    total: 0,
    loading: false,
    error: null
};
