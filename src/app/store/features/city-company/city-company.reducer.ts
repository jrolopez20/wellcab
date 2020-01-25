import {Action, createReducer, on} from '@ngrx/store';
import {CityCompanyState, initialState} from '@app/store/features/city-company/city-company.state';
import * as CityCompanyActions from './city-company.actions';

export const featureKey = 'cityCompany';

const cityCompanyReducer = createReducer(
    initialState,
    on(CityCompanyActions.loadCityCompanies,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(CityCompanyActions.loadCityCompaniesSuccess,
        (state, {cityCompanies, total}) => {
            return {
                ...state,
                cityCompanies: [...cityCompanies],
                total: total,
                loading: false,
                error: null
            };
        }
    ),
    on(CityCompanyActions.cityCompaniesError,
        (state, {error}) => {
            return {
                ...state,
                error: error,
                loading: false
            };
        }
    ),
    on(CityCompanyActions.addCityCompanyRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(CityCompanyActions.addCityCompanyCompleted,
        (state, {cityCompany}) => {
            return {
                ...state,
                cityCompanies: [...state.cityCompanies, cityCompany],
                total: state.total + 1,
                loading: false,
                error: null
            };
        }),
    on(CityCompanyActions.deleteCityCompanyRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(CityCompanyActions.deleteCityCompanyCompleted,
        (state, {cityCompany}) => {
            return {
                ...state,
                cityCompanies: [...state.cityCompanies.filter(item => item.id !== cityCompany.id)],
                total: state.total - 1,
                loading: false,
                error: null
            };
        }),
);

export function reducer(state: CityCompanyState | undefined, action: Action) {
    return cityCompanyReducer(state, action);
}
