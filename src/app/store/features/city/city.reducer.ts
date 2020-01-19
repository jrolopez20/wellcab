import {Action, createReducer, on} from '@ngrx/store';
import {CityState, initialState} from '@app/store/features/city/city.state';
import * as CityActions from './city.actions';

export const featureKey = 'city';

const cityReducer = createReducer(
    initialState,

    on(CityActions.loadCities,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),

    on(CityActions.loadCitiesSuccess,
        (state, {cities, total}) => {
            return {
                ...state,
                cities: [...cities],
                total: total,
                loading: false
            };
        }
    ),

    on(CityActions.citiesError,
        (state, {error}) => {
            return {
                ...state,
                error: {...error},
                loading: false
            };
        }
    ),

    on(CityActions.addCity,
        (state, {city}) => {
            return {
                ...state,
                cities: {
                    ...state.cities,
                    items: [...state.cities, city],
                    total: state.total++ // TODO - Test this
                }
            };
        })
);

export function reducer(state: CityState | undefined, action: Action) {
    return cityReducer(state, action);
}
