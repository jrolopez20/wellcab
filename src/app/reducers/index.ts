import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {AuthState} from '@app/store/features/auth/auth.state';
import * as fromAuth from '@app/store/features/auth/auth.reducer';

export interface AppState {
    auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
