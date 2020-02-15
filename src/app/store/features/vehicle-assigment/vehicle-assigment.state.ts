import {VehicleAssigment} from '@app/store/models/vehicle-assigment.model';

export interface VehicleAssigmentState {
    vehicleAssigments: VehicleAssigment[] | null;
    total: number;
    loading: boolean;
    error: any;
}

export const initialState: VehicleAssigmentState = {
    vehicleAssigments: null,
    total: 0,
    loading: false,
    error: null
};
