import {createAction, props} from '@ngrx/store';
import {Company} from '@app/store/models/company.model';

export const loadCompanies = createAction(
    '[Company] Load Companies',
    props<{ sort: string, order: string, page: number, limit: number, filter?: string }>()
);

export const loadCompaniesSuccess = createAction(
    '[Company] Load Companies Success',
    props<{ companies: Company[], total: number }>()
);

export const companiesError = createAction(
    '[Company] Error',
    props<{ error: any }>()
);

export const addCompanyRequest = createAction(
    '[Company] Add Company Request',
    props<{ company: Company }>()
);

export const addCompanyCompleted = createAction(
    '[Company] Add Company Completed',
    props<{ company: Company }>()
);

export const setCompanyRequest = createAction(
    '[Company] Set Company Request',
    props<{ id, company: Company }>()
);

export const setCompanyCompleted = createAction(
    '[Company] Set Company Completed',
    props<{ company: Company }>()
);
