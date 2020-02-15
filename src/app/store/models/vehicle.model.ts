import {Brand} from '@app/store/models/brand.model';
import {Model} from '@app/store/models/model.model';
import {Company} from '@app/store/models/company.model';
import {User} from '@app/store/models/user.model';

export enum Status {
    OPERATIVE = 1,
    MAINTENANCE = 2
}

export interface Vehicle {
    id: number;
    name: string;
    plateNumber: string;
    ownerUser?: User,
    ownerCompany?: Company,
    brand: Brand;
    model: Model;
    status: Status;
    color: any;
    matriculationAt: string;
    currentOdometer: number;
    odometerNextRevision: number;
    insuranceExpirationAt: string;
    itvExpirationAt?: string;
    removedAt?: string;
    rentExpirationAt?: string;
}
