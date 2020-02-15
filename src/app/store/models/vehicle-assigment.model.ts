import {Vehicle} from '@app/store/models/vehicle.model';

export interface VehicleAssigment {
    id?: number;
    vehicle: Vehicle;
    finishedAt?: string;
}
