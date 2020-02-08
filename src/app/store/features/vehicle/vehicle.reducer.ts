import {Action, createReducer, on} from '@ngrx/store';
import {VehicleState, initialState} from '@app/store/features/vehicle/vehicle.state';
import * as VehicleActions from './vehicle.actions';

export const featureKey = 'vehicle';

const vehicleReducer = createReducer(
    initialState,
    on(VehicleActions.loadVehiclesRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(VehicleActions.loadVehiclesCompleted,
        (state, {vehicles, total}) => {
            return {
                ...state,
                vehicles: [...vehicles],
                total: total,
                loading: false,
                error: null
            };
        }),
    on(VehicleActions.vehiclesError,
        (state, {error}) => {
            return {
                ...state,
                error: error,
                loading: false
            };
        }),
    on(VehicleActions.addVehicleRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(VehicleActions.addVehicleCompleted,
        (state) => {
            return {
                ...state,
                loading: false,
                error: null
            };
        }),
    on(VehicleActions.setVehicleRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(VehicleActions.setVehicleCompleted,
        (state, {vehicle}) => {
            return {
                ...state,
                vehicles: state.vehicles.map(v => {
                    if (v.id === vehicle.id) {
                        v = {...vehicle};
                    }
                    return v;
                }),
                loading: false,
                error: null
            };
        })
);

export function reducer(state: VehicleState | undefined, action: Action) {
    return vehicleReducer(state, action);
}
