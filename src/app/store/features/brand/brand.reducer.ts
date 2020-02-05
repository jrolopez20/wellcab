import {Action, createReducer, on} from '@ngrx/store';
import {BrandState, initialState} from './brand.state';
import * as BrandActions from './brand.actions';

export const featureKey = 'brand';

const brandReducer = createReducer(
    initialState,
    on(BrandActions.loadBrandsRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(BrandActions.loadBrandsCompleted,
        (state, {brands, total}) => {
            return {
                ...state,
                brands: [...brands],
                total: total,
                loading: false,
                error: null
            };
        }
    ),
    on(BrandActions.brandsError,
        (state, {error}) => {
            return {
                ...state,
                error: error,
                loading: false
            };
        }
    ),
    on(BrandActions.addBrandRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(BrandActions.addBrandCompleted,
        (state) => {
            return {
                ...state,
                loading: false,
                error: null
            };
        }),
    on(BrandActions.setBrandRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(BrandActions.setBrandCompleted,
        (state, {brand}) => {
            return {
                ...state,
                brands: state.brands.map(u => {
                    if (u.id === brand.id) {
                        u = {...brand};
                    }
                    return u;
                }),
                loading: false,
                error: null
            };
        })
);

export function reducer(state: BrandState | undefined, action: Action) {
    return brandReducer(state, action);
}
