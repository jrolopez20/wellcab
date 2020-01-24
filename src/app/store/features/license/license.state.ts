import {License} from '@app/store/models/license.model';


export interface LicenseState {
    licenses: License[] | null;
    total: number;
    loading: boolean;
    error: any;
}

export const initialState: LicenseState = {
    licenses: null,
    total: 0,
    loading: true,
    error: null
};
