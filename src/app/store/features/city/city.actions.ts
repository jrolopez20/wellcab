import {createAction, props} from '@ngrx/store';
import {City} from '@app/store/models/city.model';

export const loadCities = createAction(
    '[City] Load Cities',
    props<{ sort: string, order: string, page: number, filter?: string }>()
);

export const loadCitiesSuccess = createAction(
    '[City] Load Cities Success',
    props<{ cities: City[], total: number }>()
);

export const citiesError = createAction(
    '[City]  Error',
    props<{ error: any }>()
);

export const addCity = createAction(
    '[City] Add City',
    props<{ city: City }>()
);

