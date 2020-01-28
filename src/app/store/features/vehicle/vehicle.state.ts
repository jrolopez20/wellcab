import {Vehicle} from '@app/store/models/vehicle.model';

export interface VehicleState {
    vehicles: Vehicle[] | null;
    total: number;
    loading: boolean;
    error: any;
}

export const initialState: VehicleState = {
    vehicles: null,
    total: 0,
    loading: false,
    error: null
};
