import {Action, createReducer, on} from '@ngrx/store';
import {AuthState, initialState} from '@app/store/features/auth/auth.state';
import * as AuthActions from './auth.actions';

export const featureKey = 'auth';

const authReducer = createReducer(
    initialState,

    on(AuthActions.loginRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(AuthActions.loginCompleted,
        (state) => {
            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                error: null
            };
        }
    ),
    on(AuthActions.getAuthenticatedUserRequest,
        (state) => {
            return {
                ...state,
                loading: true,
                error: null
            };
        }
    ),
    on(AuthActions.getAuthenticatedUserCompleted,
        (state, {user}) => {
            return {
                ...state,
                user: {...user},
                isLoggedIn: true,
                loading: false,
                error: null
            };
        }
    ),
    on(AuthActions.loginFailed,
        (state, {error}) => {
            return {
                ...state,
                user: null,
                isLoggedIn: false,
                loading: false,
                error: error
            };
        }
    ),
    on(AuthActions.authError,
        (state, {error}) => {
            return {
                ...state,
                loading: false,
                error: error
            };
        }
    ),
    on(AuthActions.logoutCompleted,
        (state) => {
            return {
                user: null,
                isLoggedIn: false,
                loading: false,
                error: null
            };
        }
    ),
    on(AuthActions.updateProfileRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(AuthActions.updateProfileCompleted,
        (state, {user}) => {
            return {
                ...state,
                user: {...user},
                loading: false,
                error: null
            };
        }
    )
);

export function reducer(state: AuthState | undefined, action: Action) {
    return authReducer(state, action);
}
