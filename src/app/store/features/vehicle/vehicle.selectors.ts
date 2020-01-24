import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey} from './vehicle.reducer';
import {VehicleState} from './vehicle.state';

export const getVehicleState = createFeatureSelector<VehicleState>(featureKey);

export const getVehiclesList = createSelector(
    getVehicleState,
    (state: VehicleState) => state.vehicles
);

export const getVehiclesTotal = createSelector(
    getVehicleState,
    (state: VehicleState) => state.total
);

export const getIsLoading = createSelector(
    getVehicleState,
    (state: VehicleState) => state.loading
);

export const getError = createSelector(
    getVehicleState,
    (state: VehicleState) => state.error
);
