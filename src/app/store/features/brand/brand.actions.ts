import {createAction, props} from '@ngrx/store';
import {Brand} from '@app/store/models/brand.model';

export const loadBrandsRequest = createAction(
    '[Brand] Load Brands',
    props<{ sort: string, order: string, page: number, filter?: string }>()
);

export const loadBrandsCompleted = createAction(
    '[Brand] Load Brands Completed',
    props<{ brands: Brand[], total: number }>()
);

export const brandsError = createAction(
    '[Brand] Error',
    props<{ error: any }>()
);

export const addBrandRequest = createAction(
    '[Brand] Add Brand Request',
    props<{ brand?: Brand }>()
);

export const addBrandCompleted = createAction(
    '[Brand] Add Brand Completed',
    props<{ brand: Brand }>()
);

export const setBrandRequest = createAction(
    '[Brand] Set Brand Request',
    props<{ brand: Brand }>()
);

export const setBrandCompleted = createAction(
    '[Brand] Set Brand Completed',
    props<{ brand: Brand }>()
);

export const deleteBrandRequest = createAction(
    '[Brand] Delete Brand Request',
    props<{ brand: Brand }>()
);

export const deleteBrandCompleted = createAction(
    '[Brand] Delete Brand Completed',
    props<{ brand: Brand }>()
);
