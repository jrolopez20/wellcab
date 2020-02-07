import {Action, createReducer, on} from '@ngrx/store';
import {UserState, initialState} from '@app/store/features/user/user.state';
import * as UserActions from './user.actions';

export const featureKey = 'user';

const userReducer = createReducer(
    initialState,
    on(UserActions.loadUsersRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(UserActions.loadUsersCompleted,
        (state, {users, total}) => {
            return {
                ...state,
                users: [...users],
                total: total,
                loading: false,
                error: null
            };
        }),
    on(UserActions.usersError,
        (state, {error}) => {
            return {
                ...state,
                error: error,
                loading: false
            };
        }),
    on(UserActions.addUserRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(UserActions.addUserCompleted,
        (state, {user}) => {
            return {
                ...state,
                loading: false,
                error: null
            };
        }),
    on(UserActions.setUserRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(UserActions.setUserCompleted,
        (state, {user}) => {
            return {
                ...state,
                users: updateUsers(state.users, user),
                loading: false,
                error: null
            };
        }),
    on(UserActions.toggleAccessRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(UserActions.toggleAccessCompleted,
        (state, {user}) => {
            return {
                ...state,
                users: updateUsers(state.users, user),
                loading: false,
                error: null
            };
        }),
    on(UserActions.toggleUnregisterRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(UserActions.toggleUnregisterCompleted,
        (state, {user}) => {
            return {
                ...state,
                users: updateUsers(state.users, user),
                loading: false,
                error: null
            };
        }),
    on(UserActions.changePasswordRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(UserActions.changePasswordCompleted,
        (state) => {
            return {
                ...state,
                loading: false,
                error: null
            };
        })
);

/**
 * Update the user list
 * @param users
 * @param user
 */
const updateUsers = (users, user) => {
    return [...users].map(item => {
        if (item.id === user.id) {
            return {...user};
        }
        return item;
    });
};

export function reducer(state: UserState | undefined, action: Action) {
    return userReducer(state, action);
}
