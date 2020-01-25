import {Action, ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '@environments/environment';
import {AuthState} from '@app/store/features/auth/auth.state';
import * as fromAuth from '@app/store/features/auth/auth.reducer';


export interface AppState {
    auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.reducer
};

export function clearState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function (state: AppState | undefined, action: Action): AppState {
        if (action.type === '[Auth] Logout Completed') {
            state = undefined;
        }
        return reducer(state, action);
    };
}

// export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
export const metaReducers: MetaReducer<AppState>[] = [clearState];
