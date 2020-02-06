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
    on(CityCompanyActions.saveCityCompanyRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(CityCompanyActions.saveCityCompanyCompleted,
        (state, {cityCompany}) => {
            return {
                ...state,
                cityCompanies: updateCityCompanies(state.cityCompanies, cityCompany),
                loading: false,
                error: null
            };
        }
    ),
    on(CityCompanyActions.toggleLinkCityCompanyRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(CityCompanyActions.toggleLinkCityCompanyCompleted,
        (state, {cityCompany}) => {
            return {
                ...state,
                cityCompanies: updateCityCompanies(state.cityCompanies, cityCompany),
                loading: false,
                error: null
            };
        }
    )
);

/**
 * Update the city companies list
 * @param cityCompanies
 * @param cityCompany
 */
const updateCityCompanies = (cityCompanies, cityCompany) => {
    return [...cityCompanies].map(item => {
        if (item.id === cityCompany.id) {
            return {...cityCompany};
        }
        return item;
    });
};

export function reducer(state: CityCompanyState | undefined, action: Action) {
    return cityCompanyReducer(state, action);
}
