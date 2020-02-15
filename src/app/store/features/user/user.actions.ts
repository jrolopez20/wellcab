import {createAction, props} from '@ngrx/store';
import {Role, User} from '@app/store/models/user.model';

export const loadUsersRequest = createAction(
    '[User] Load Users',
    props<{ sort: string, order: string, page: number, limit: number, filter?: string, active?: boolean, roles?: Role[] }>()
);

export const loadUsersCompleted = createAction(
    '[User] Load Users Completed',
    props<{ users: User[], total: number }>()
);

export const usersError = createAction(
    '[User] Error',
    props<{ error: any }>()
);

export const addUserRequest = createAction(
    '[User] Add User Request',
    props<{ user: User }>()
);

export const addUserCompleted = createAction(
    '[User] Add User Completed',
    props<{ user: User }>()
);

export const setUserRequest = createAction(
    '[User] Set User Request',
    props<{ user: User }>()
);

export const setUserCompleted = createAction(
    '[User] Set User Completed',
    props<{ user: User }>()
);

export const toggleAccessRequest = createAction(
    '[User] Toggle Access Request',
    props<{ user: User }>()
);

export const toggleAccessCompleted = createAction(
    '[User] Toggle Access Completed',
    props<{ user: User }>()
);

export const toggleUnregisterRequest = createAction(
    '[User] Toggle Unregister Request',
    props<{ user: User }>()
);

export const toggleUnregisterCompleted = createAction(
    '[User] Toggle Unregister Completed',
    props<{ user: User }>()
);

export const changePasswordRequest = createAction(
    '[User] Change Password Request',
    props<{ oldPassword: string, newPassword: string }>()
);

export const changePasswordCompleted = createAction(
    '[User] Change Password Completed'
);

export const resetStorage = createAction(
    '[User] Reset Storage'
);
