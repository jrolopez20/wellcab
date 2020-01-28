import {Model} from '@app/store/models/model.model';

export interface ModelState {
    models: Model[] | null;
    total: number;
    loading: boolean;
    error: any;
}

export const initialState: ModelState = {
    models: null,
    total: 0,
    loading: false,
    error: null
};
