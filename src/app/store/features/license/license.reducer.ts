import {Action, createReducer, on} from '@ngrx/store';
import {LicenseState, initialState} from './license.state';
import * as LicenseActions from './license.actions';

export const featureKey = 'license';

const licenseReducer = createReducer(
    initialState,
    on(LicenseActions.loadLicensesRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(LicenseActions.loadLicensesCompleted,
        (state, {licenses, total}) => {
            return {
                ...state,
                licenses: [...licenses],
                total: total,
                loading: false,
                error: null
            };
        }
    ),
    on(LicenseActions.licensesError,
        (state, {error}) => {
            return {
                ...state,
                error: error,
                loading: false
            };
        }
    ),
    on(LicenseActions.addLicenseRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(LicenseActions.addLicenseCompleted,
        (state) => {
            return {
                ...state,
                loading: false,
                error: null
            };
        }
    ),
    on(LicenseActions.setLicenseRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(LicenseActions.setLicenseCompleted,
        (state, {license}) => {
            return {
                ...state,
                licenses: state.licenses.map(u => {
                    if (u.id === license.id) {
                        u = {...license};
                    }
                    return u;
                }),
                loading: false,
                error: null
            };
        }
    ),
    on(LicenseActions.setCurrentLicense,
        (state, {license}) => {
            return {
                ...state,
                currentLicense: license || null
            };
        }
    )
);

export function reducer(state: LicenseState | undefined, action: Action) {
    return licenseReducer(state, action);
}
