import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as BrandActions from './brand.actions';
import {Brand} from '@app/store/models/brand.model';
import {Observable} from 'rxjs';
import * as BrandSelectors from './brand.selectors';
import {AppState} from '@app/reducers';

@Injectable({
    providedIn: 'root'
})
export class BrandService {

    constructor(private store: Store<AppState>) {
    }

    /**
     * Load brands
     * @param sort
     * @param order
     * @param page
     * @param filter
     */
    public loadBrands({sort, order, page, filter}) {
        this.store.dispatch(BrandActions.loadBrandsRequest({sort, order, page, filter}));
    }

    public getBrandsList$(): Observable<Brand[]> {
        return this.store.select(BrandSelectors.getBrandsList);
    }

    public getBrandsTotal$(): Observable<number> {
        return this.store.select(BrandSelectors.getBrandsTotal);
    }

    public getIsLoading$(): Observable<boolean> {
        return this.store.select(BrandSelectors.getIsLoading);
    }

    public getError$(): Observable<any> {
        return this.store.select(BrandSelectors.getError);
    }

    public addBrand(brand: Brand) {
        this.store.dispatch(
            BrandActions.addBrandRequest({
                brand: {...brand}
            })
        );
    }

    public setBrand(brand: Brand) {
        this.store.dispatch(
            BrandActions.setBrandRequest({
                brand: {...brand}
            })
        );
    }

    public deleteBrand(brand: Brand) {
        this.store.dispatch(
            BrandActions.deleteBrandRequest({
                brand: {...brand}
            })
        );
    }
}
