import {Action, createReducer, on} from '@ngrx/store';
import {DriverAssigmentState, initialState} from './driver-assigment.state';
import * as DriverAssigmentActions from './driver-assigment.actions';

export const featureKey = 'driverAssigment';

const driverAssigmentReducer = createReducer(
    initialState,
    on(DriverAssigmentActions.loadDriverAssigmentsRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(DriverAssigmentActions.loadDriverAssigmentsCompleted,
        (state, {driverAssigments, total}) => {
            return {
                ...state,
                driverAssigments: [...driverAssigments],
                total: total,
                loading: false,
                error: null
            };
        }),
    on(DriverAssigmentActions.driverAssigmentsError,
        (state, {error}) => {
            return {
                ...state,
                error: error,
                loading: false
            };
        }),
    on(DriverAssigmentActions.addDriverAssigmentRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(DriverAssigmentActions.addDriverAssigmentCompleted,
        (state) => {
            return {
                ...state,
                loading: false,
                error: null
            };
        }),
    on(DriverAssigmentActions.setDriverAssigmentRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(DriverAssigmentActions.setDriverAssigmentCompleted,
        (state, {driverAssigment}) => {
            return {
                ...state,
                driverAssigments: state.driverAssigments.map(u => {
                    if (u.id === driverAssigment.id) {
                        u = {...driverAssigment};
                    }
                    return u;
                }),
                loading: false,
                error: null
            };
        })
);

export function reducer(state: DriverAssigmentState | undefined, action: Action) {
    return driverAssigmentReducer(state, action);
}
