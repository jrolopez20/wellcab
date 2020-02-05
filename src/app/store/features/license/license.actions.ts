import {createAction, props} from '@ngrx/store';
import {License} from '@app/store/models/license.model';

export const loadLicensesRequest = createAction(
    '[License] Load Licenses',
    props<{ sort: string, order: string, page: number, limit: number, filter?: string }>()
);

export const loadLicensesCompleted = createAction(
    '[License] Load Licenses Completed',
    props<{ licenses: License[], total: number }>()
);

export const licensesError = createAction(
    '[License] Error',
    props<{ error: any }>()
);

export const addLicenseRequest = createAction(
    '[License] Add License Request',
    props<{ license: License }>()
);

export const addLicenseCompleted = createAction(
    '[License] Add License Completed',
    props<{ license: License }>()
);

export const setLicenseRequest = createAction(
    '[License] Set License Request',
    props<{ license: License }>()
);

export const setLicenseCompleted = createAction(
    '[License] Set License Completed',
    props<{ license: License }>()
);

