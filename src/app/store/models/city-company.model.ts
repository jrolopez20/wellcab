import {Company} from '@app/store/models/company.model';

export interface CityCompany {
    id: number;
    company: Company;
    postalCode: string;
    address: string;
    removedAt?: string;
}
