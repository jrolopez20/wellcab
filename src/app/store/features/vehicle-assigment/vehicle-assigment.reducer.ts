import {Action, createReducer, on} from '@ngrx/store';
import {VehicleAssigmentState, initialState} from './vehicle-assigment.state';
import * as VehicleAssigmentActions from './vehicle-assigment.actions';

export const featureKey = 'vehicleAssigment';

const vehicleAssigmentReducer = createReducer(
    initialState,
    on(VehicleAssigmentActions.loadVehicleAssigmentsRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(VehicleAssigmentActions.loadVehicleAssigmentsCompleted,
        (state, {vehicleAssigments, total}) => {
            return {
                ...state,
                vehicleAssigments: [...vehicleAssigments],
                total: total,
                loading: false,
                error: null
            };
        }),
    on(VehicleAssigmentActions.vehicleAssigmentsError,
        (state, {error}) => {
            return {
                ...state,
                error: error,
                loading: false
            };
        }),
    on(VehicleAssigmentActions.addVehicleAssigmentRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(VehicleAssigmentActions.addVehicleAssigmentCompleted,
        (state) => {
            return {
                ...state,
                loading: false,
                error: null
            };
        }),
    on(VehicleAssigmentActions.setVehicleAssigmentRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(VehicleAssigmentActions.setVehicleAssigmentCompleted,
        (state, {vehicleAssigment}) => {
            return {
                ...state,
                vehicleAssigments: updateVehicleAssigments(state.vehicleAssigments, vehicleAssigment),
                loading: false,
                error: null
            };
        }),
    on(VehicleAssigmentActions.unlinkVehicleRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(VehicleAssigmentActions.unlinkVehicleCompleted,
        (state, {vehicleAssigment}) => {
            return {
                ...state,
                vehicleAssigments: updateVehicleAssigments(state.vehicleAssigments, vehicleAssigment),
                loading: false,
                error: null
            };
        })
);

/**
 * Update the vehicle assigments list
 * @param vehicleAssigments
 * @param vehicleAssigment
 */
const updateVehicleAssigments = (vehicleAssigments, vehicleAssigment) => {
    return [...vehicleAssigments].map(item => {
        if (item.id === vehicleAssigment.id) {
            return {...vehicleAssigment};
        }
        return item;
    });
};

export function reducer(state: VehicleAssigmentState | undefined, action: Action) {
    return vehicleAssigmentReducer(state, action);
}
