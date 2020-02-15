import {createAction, props} from '@ngrx/store';
import {VehicleAssigment} from '@app/store/models/vehicle-assigment.model';
import {Vehicle} from '@app/store/models/vehicle.model';

export const loadVehicleAssigmentsRequest = createAction(
    '[VehicleAssigment] Load Vehicle Assigments Request',
    props<{ licenseId: number, sort: string, order: string, page: number, limit: number, filter?: string }>()
);

export const loadVehicleAssigmentsCompleted = createAction(
    '[VehicleAssigment] Load Vehicle Assigments Completed',
    props<{ vehicleAssigments: VehicleAssigment[], total: number }>()
);

export const vehicleAssigmentsError = createAction(
    '[VehicleAssigment] Error',
    props<{ error: any }>()
);

export const addVehicleAssigmentRequest = createAction(
    '[VehicleAssigment] Add Vehicle Assigment Request',
    props<{ licenseId: number, vehicle: Vehicle }>()
);

export const addVehicleAssigmentCompleted = createAction(
    '[VehicleAssigment] Add Vehicle Assigment Completed',
    props<{ vehicleAssigment: VehicleAssigment }>()
);

export const setVehicleAssigmentRequest = createAction(
    '[VehicleAssigment] Set Vehicle Assigment Request',
    props<{ licenseId: number, vehicle: Vehicle }>()
);

export const setVehicleAssigmentCompleted = createAction(
    '[VehicleAssigment] Set Vehicle Assigment Completed',
    props<{ vehicleAssigment: VehicleAssigment }>()
);

export const unlinkVehicleRequest = createAction(
    '[VehicleAssigment] Unlink Vehicle Request',
    props<{ licenseId: number}>()
);

export const unlinkVehicleCompleted = createAction(
    '[VehicleAssigment] Unlink Vehicle Completed',
    props<{ vehicleAssigment: VehicleAssigment }>()
);


