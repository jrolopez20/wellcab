import {Action, createReducer, on} from '@ngrx/store';
import {CompanyState, initialState} from '@app/store/features/company/company.state';
import * as CompanyActions from './company.actions';

export const featureKey = 'company';

const companyReducer = createReducer(
    initialState,
    on(CompanyActions.loadCompanies,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }
    ),
    on(CompanyActions.loadCompaniesSuccess,
        (state, {companies, total}) => {
            return {
                ...state,
                companies: [...companies],
                total: total,
                loading: false,
                error: null
            };
        }
    ),
    on(CompanyActions.companiesError,
        (state, {error}) => {
            return {
                ...state,
                error: error,
                loading: false
            };
        }
    ),
    on(CompanyActions.addCompanyRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(CompanyActions.addCompanyCompleted,
        (state, {company}) => {
            return {
                ...state,
                companies: [...state.companies || [], {...company}],
                total: state.total + 1,
                loading: false,
                error: null
            };
        }),
    on(CompanyActions.setCompanyRequest,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(CompanyActions.setCompanyCompleted,
        (state, {company}) => {
            return {
                ...state,
                loading: false,
                error: null
            };
        })
);

export function reducer(state: CompanyState | undefined, action: Action) {
    return companyReducer(state, action);
}
