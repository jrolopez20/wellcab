import {Company} from '@app/store/models/company.model';
import {City} from '@app/store/models/city.model';

export interface Contract {
    id?: number;
    company: Company;
    city: City;
    finishedAt?: string;
}
