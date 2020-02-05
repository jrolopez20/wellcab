import {createAction, props} from '@ngrx/store';
import {Model} from '@app/store/models/model.model';

export const loadModelsRequest = createAction(
    '[Model] Load Models',
    props<{ brandId: number, sort: string, order: string, page: number, limit: number, filter?: string }>()
);

export const loadModelsCompleted = createAction(
    '[Model] Load Models Completed',
    props<{ models: Model[], total: number }>()
);

export const modelsError = createAction(
    '[Model] Error',
    props<{ error: any }>()
);

export const addModelRequest = createAction(
    '[Model] Add Model Request',
    props<{ brandId: number, model: Model }>()
);

export const addModelCompleted = createAction(
    '[Model] Add Model Completed',
    props<{ model: Model }>()
);

export const setModelRequest = createAction(
    '[Model] Set Model Request',
    props<{ brandId: number, model: Model }>()
);

export const setModelCompleted = createAction(
    '[Model] Set Model Completed',
    props<{ model: Model }>()
);

export const clearStore = createAction(
    '[Model] Clear Store'
);
