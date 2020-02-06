import {createAction, props} from '@ngrx/store';
import {User} from '@app/store/models/user.model';

export const loadUsersRequest = createAction(
    '[User] Load Users',
    props<{ sort: string, order: string, page: number, limit: number, filter?: string }>()
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
