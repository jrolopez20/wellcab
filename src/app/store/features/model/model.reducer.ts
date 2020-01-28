import {Action, createReducer, on} from '@ngrx/store';
import {ModelState, initialState} from './model.state';
import * as ModelActions from './model.actions';

export const featureKey = 'model';

const modelReducer = createReducer(
    initialState,
    on(ModelActions.loadModelsRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(ModelActions.loadModelsCompleted,
        (state, {models, total}) => {
            return {
                ...state,
                models: [...models],
                total: total,
                loading: false,
                error: null
            };
        }
    ),
    on(ModelActions.modelsError,
        (state, {error}) => {
            return {
                ...state,
                error: error,
                loading: false
            };
        }
    ),
    on(ModelActions.addModelRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(ModelActions.addModelCompleted,
        (state, {model}) => {
            return {
                ...state,
                models: [...state.models, model],
                total: state.total + 1,
                loading: false,
                error: null
            };
        }),
    on(ModelActions.setModelRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(ModelActions.setModelCompleted,
        (state, {model}) => {
            return {
                ...state,
                models: state.models.map(u => {
                    if (u.id === model.id) {
                        u = {...model};
                    }
                    return u;
                }),
                loading: false,
                error: null
            };
        }),
    on(ModelActions.clearStore,
        (state) => {
            return {
                ...initialState
            };
        })
);

export function reducer(state: ModelState | undefined, action: Action) {
    return modelReducer(state, action);
}
