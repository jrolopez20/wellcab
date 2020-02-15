import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey} from './driver-assigment.reducer';
import {DriverAssigmentState} from './driver-assigment.state';

export const getDriverAssigmentState = createFeatureSelector<DriverAssigmentState>(featureKey);

export const getDriverAssigmentsList = createSelector(
    getDriverAssigmentState,
    (state: DriverAssigmentState) => state.driverAssigments
);

export const getDriverAssigmentsTotal = createSelector(
    getDriverAssigmentState,
    (state: DriverAssigmentState) => state.total
);

export const getIsLoading = createSelector(
    getDriverAssigmentState,
    (state: DriverAssigmentState) => state.loading
);

export const getError = createSelector(
    getDriverAssigmentState,
    (state: DriverAssigmentState) => state.error
);
