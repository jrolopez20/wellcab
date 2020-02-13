import {License} from '@app/store/models/license.model';

export interface LicenseState {
    currentLicense: License;
    licenses: License[] | null;
    total: number;
    loading: boolean;
    error: any;
}

export const initialState: LicenseState = {
    currentLicense: null,
    licenses: null,
    total: 0,
    loading: false,
    error: null
};
