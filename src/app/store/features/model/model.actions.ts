import {createAction, props} from '@ngrx/store';
import {Model} from '@app/store/models/model.model';

export const loadModelsRequest = createAction(
    '[Model] Load Models',
    props<{ sort: string, order: string, page: number, filter?: string }>()
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
    props<{ model?: Model }>()
);

export const addModelCompleted = createAction(
    '[Model] Add Model Completed',
    props<{ model: Model }>()
);

export const setModelRequest = createAction(
    '[Model] Set Model Request',
    props<{ model: Model }>()
);

export const setModelCompleted = createAction(
    '[Model] Set Model Completed',
    props<{ model: Model }>()
);

export const deleteModelRequest = createAction(
    '[Model] Delete Model Request',
    props<{ model: Model }>()
);

export const deleteModelCompleted = createAction(
    '[Model] Delete Model Completed',
    props<{ model: Model }>()
);

export const clearStore = createAction(
    '[Model] Clear Store'
);
