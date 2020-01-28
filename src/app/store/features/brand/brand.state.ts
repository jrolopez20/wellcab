import {License} from '@app/store/models/license.model';
import {Brand} from '@app/store/models/brand.model';

export interface BrandState {
    brands: Brand[] | null;
    total: number;
    loading: boolean;
    error: any;
}

export const initialState: BrandState = {
    brands: null,
    total: 0,
    loading: false,
    error: null
};
