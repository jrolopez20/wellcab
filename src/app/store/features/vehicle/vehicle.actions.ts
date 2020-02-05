import {createAction, props} from '@ngrx/store';
import {Vehicle} from '@app/store/models/vehicle.model';

export const loadVehiclesRequest = createAction(
    '[Vehicle] Load Vehicles',
    props<{ sort: string, order: string, page: number, limit: number, filter?: string }>()
);

export const loadVehiclesCompleted = createAction(
    '[Vehicle] Load Vehicles Completed',
    props<{ vehicles: Vehicle[], total: number }>()
);

export const vehiclesError = createAction(
    '[Vehicle] Error',
    props<{ error: any }>()
);

export const addVehicleRequest = createAction(
    '[Vehicle] Add Vehicle Request',
    props<{ vehicle?: Vehicle }>()
);

export const addVehicleCompleted = createAction(
    '[Vehicle] Add Vehicle Completed',
    props<{ vehicle: Vehicle }>()
);

export const setVehicleRequest = createAction(
    '[Vehicle] Set Vehicle Request',
    props<{ vehicle: Vehicle }>()
);

export const setVehicleCompleted = createAction(
    '[Vehicle] Set Vehicle Completed',
    props<{ vehicle: Vehicle }>()
);

export const deleteVehicleRequest = createAction(
    '[Vehicle] Delete Vehicle Request',
    props<{ vehicle: Vehicle }>()
);

export const deleteVehicleCompleted = createAction(
    '[Vehicle] Delete Vehicle Completed',
    props<{ vehicle: Vehicle }>()
);
