import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey} from './vehicle-assigment.reducer';
import {VehicleAssigmentState} from './vehicle-assigment.state';

export const getVehicleAssigmentState = createFeatureSelector<VehicleAssigmentState>(featureKey);

export const getVehicleAssigmentsList = createSelector(
    getVehicleAssigmentState,
    (state: VehicleAssigmentState) => state.vehicleAssigments
);

export const getVehicleAssigmentsTotal = createSelector(
    getVehicleAssigmentState,
    (state: VehicleAssigmentState) => state.total
);

export const getIsLoading = createSelector(
    getVehicleAssigmentState,
    (state: VehicleAssigmentState) => state.loading
);

export const getError = createSelector(
    getVehicleAssigmentState,
    (state: VehicleAssigmentState) => state.error
);
