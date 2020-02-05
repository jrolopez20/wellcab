import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as BrandActions from './brand.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {Brand} from '@app/store/models/brand.model';

@Injectable()
export class BrandEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadBrands$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrandActions.loadBrandsRequest),
            concatMap(({sort, order, page, limit, filter}) => {
                return this.http.get<any>(`brands?search=${filter}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`).pipe(
                    map(response =>
                        BrandActions.loadBrandsCompleted({brands: response.data, total: response.pagination.total})
                    ),
                    catchError(error =>
                        of(BrandActions.brandsError({error}))
                    )
                );
            })
        )
    );

    public addBrand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrandActions.addBrandRequest),
            concatMap(({brand}) => {
                return this.http.post<Brand>('brands', brand).pipe(
                    map(response =>
                        BrandActions.addBrandCompleted({brand: response})
                    ),
                    catchError(error => {
                        return of(BrandActions.brandsError({error}));
                    })
                );
            })
        )
    );

    public setBrand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrandActions.setBrandRequest),
            concatMap(({brand}) => {
                // Extract ID from brand into a separate variable and put the rest in other one.
                const {id, ...brandCopy} = brand;
                return this.http.put<Brand>(`brands/${id}`, brandCopy).pipe(
                    map(response =>
                        BrandActions.setBrandCompleted({brand: response})
                    ),
                    catchError(error => {
                        return of(BrandActions.brandsError({error}));
                    })
                );
            })
        )
    );

}
