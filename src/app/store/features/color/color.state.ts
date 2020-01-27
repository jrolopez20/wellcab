import {Color} from '@app/store/models/color.model';

export interface ColorState {
    colors: Color[] | null;
    total: number;
    loading: boolean;
    error: any;
}

export const initialState: ColorState = {
    colors: null,
    total: 0,
    loading: false,
    error: null
};
