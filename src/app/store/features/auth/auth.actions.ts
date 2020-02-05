import {createAction, props} from '@ngrx/store';
import {User} from '@app/store/models/user.model';

export const loginRequest = createAction(
    '[Auth] Login Requested',
    props<{ email: string, password: string }>()
);

export const loginCompleted = createAction(
    '[Auth] Login Completed'
);

export const getAuthenticatedUserRequest = createAction(
    '[Auth] Get Authenticated User Request'
);

export const getAuthenticatedUserCompleted = createAction(
    '[Auth] Get Authenticated User Completed',
    props<{ user: User }>()
);

export const loginFailed = createAction(
    '[Auth] Login Failed',
    props<{ error: any }>()
);

export const logoutRequest = createAction(
    '[Auth] Logout Request'
);

export const logoutCompleted = createAction(
    '[Auth] Logout Completed'
);

export const authError = createAction(
    '[Auth] Error',
    props<{ error: any }>()
);

export const updateProfileRequest = createAction(
    '[Auth] Update Profile Request',
    props<{ user: User }>()
);

export const updateProfileCompleted = createAction(
    '[Auth] Update Profile Completed',
    props<{ user: User }>()
);
