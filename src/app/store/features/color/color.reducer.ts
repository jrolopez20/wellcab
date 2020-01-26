import {Action, createReducer, on} from '@ngrx/store';
import {ColorState, initialState} from './color.state';
import * as ColorActions from './color.actions';

export const featureKey = 'color';

const colorReducer = createReducer(
    initialState,
    on(ColorActions.loadColorsRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(ColorActions.loadColorsCompleted,
        (state, {colors, total}) => {
            return {
                ...state,
                colors: [...colors],
                total: total,
                loading: false,
                error: null
            };
        }
    ),
    on(ColorActions.colorsError,
        (state, {error}) => {
            return {
                ...state,
                error: error,
                loading: false
            };
        }
    ),
    on(ColorActions.addColorRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(ColorActions.addColorCompleted,
        (state, {color}) => {
            return {
                ...state,
                colors: [...state.colors, color],
                total: state.total + 1,
                loading: false,
                error: null
            };
        }),
    on(ColorActions.setColorRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(ColorActions.setColorCompleted,
        (state, {color}) => {
            return {
                ...state,
                colors: state.colors.map(u => {
                    if (u.id === color.id) {
                        u = {...color};
                    }
                    return u;
                }),
                loading: false,
                error: null
            };
        })
);

export function reducer(state: ColorState | undefined, action: Action) {
    return colorReducer(state, action);
}
