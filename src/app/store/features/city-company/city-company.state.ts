import {CityCompany} from '@app/store/models/city-company.model';

export interface CityCompanyState {
    cityCompanies: CityCompany[] | null;
    total: number;
    loading: boolean;
    error: any;
}

export const initialState: CityCompanyState = {
    cityCompanies: null,
    total: 0,
    loading: false,
    error: null
};
