import {DriverAssigment} from '@app/store/models/driver-assigment.model';

export interface DriverAssigmentState {
    driverAssigments: DriverAssigment[] | null;
    total: number;
    loading: boolean;
    error: any;
}

export const initialState: DriverAssigmentState = {
    driverAssigments: null,
    total: 0,
    loading: false,
    error: null
};
