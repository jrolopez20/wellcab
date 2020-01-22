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
                loading: false,
                error: null
            };
        }
    ),
    on(CityActions.citiesError,
        (state, {error}) => {
            return {
                ...state,
                error: error,
                loading: false
            };
        }
    ),
    on(CityActions.addCityRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(CityActions.addCityCompleted,
        (state, {city}) => {
            return {
                ...state,
                cities: [...state.cities, city],
                total: state.total + 1,
                loading: false,
                error: null
            };
        }),
    on(CityActions.deleteCityRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(CityActions.deleteCityCompleted,
        (state, {city}) => {
            return {
                ...state,
                cities: [...state.cities.filter(item => item.id !== city.id)],
                total: state.total - 1,
                loading: false,
                error: null
            };
        }),
);

export function reducer(state: CityState | undefined, action: Action) {
    return cityReducer(state, action);
}
