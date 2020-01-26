import {createAction, props} from '@ngrx/store';
import {Color} from '@app/store/models/color.model';

export const loadColorsRequest = createAction(
    '[Color] Load Colors',
    props<{ sort: string, order: string, page: number, filter?: string }>()
);

export const loadColorsCompleted = createAction(
    '[Color] Load Colors Completed',
    props<{ colors: Color[], total: number }>()
);

export const colorsError = createAction(
    '[Color] Error',
    props<{ error: any }>()
);

export const addColorRequest = createAction(
    '[Color] Add Color Request',
    props<{ color?: Color }>()
);

export const addColorCompleted = createAction(
    '[Color] Add Color Completed',
    props<{ color: Color }>()
);

export const setColorRequest = createAction(
    '[Color] Set Color Request',
    props<{ color: Color }>()
);

export const setColorCompleted = createAction(
    '[Color] Set Color Completed',
    props<{ color: Color }>()
);

export const deleteColorRequest = createAction(
    '[Color] Delete Color Request',
    props<{ color: Color }>()
);

export const deleteColorCompleted = createAction(
    '[Color] Delete Color Completed',
    props<{ color: Color }>()
);
