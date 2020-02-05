import {createAction, props} from '@ngrx/store';
import {City} from '@app/store/models/city.model';

export const loadCities = createAction(
    '[City] Load Cities',
    props<{ sort: string, order: string, page: number, limit: number, filter?: string }>()
);

export const loadCitiesSuccess = createAction(
    '[City] Load Cities Success',
    props<{ cities: City[], total: number }>()
);

export const citiesError = createAction(
    '[City] Error',
    props<{ error: any }>()
);

export const addCityRequest = createAction(
    '[City] Add City Request',
    props<{ city: City }>()
);

export const addCityCompleted = createAction(
    '[City] Add City Completed',
    props<{ city: City }>()
);

export const setCityRequest = createAction(
    '[City] Set City Request',
    props<{ id, city: City }>()
);

export const setCityCompleted = createAction(
    '[City] Set City Completed',
    props<{ city: City }>()
);


