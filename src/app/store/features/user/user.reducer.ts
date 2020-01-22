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
        }
    ),
    on(UserActions.loadUsersCompleted,
        (state, {users, total}) => {
            return {
                ...state,
                users: [...users],
                total: total,
                loading: false,
                error: null
            };
        }
    ),
    on(UserActions.usersError,
        (state, {error}) => {
            return {
                ...state,
                error: error,
                loading: false
            };
        }
    ),
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
                users: [...state.users, user],
                total: state.total + 1,
                loading: false,
                error: null
            };
        })
);

export function reducer(state: UserState | undefined, action: Action) {
    return userReducer(state, action);
}
