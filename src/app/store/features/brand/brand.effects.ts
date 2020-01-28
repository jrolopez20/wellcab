import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as BrandActions from './brand.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable()
export class BrandEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadBrands$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrandActions.loadBrandsRequest),
            concatMap(({sort, order, page, filter}) => {
                return this.http.get<any>(`brands?filter=${filter}&sort=${sort}&order=${order}&page=${page}`).pipe(
                    map(response =>
                        BrandActions.loadBrandsCompleted({brands: response.items, total: response.total})
                    ),
                    catchError(error =>
                        of(BrandActions.brandsError(error))
                    )
                );
            })
        )
    );

    public deleteBrand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrandActions.deleteBrandRequest),
            concatMap(({brand}) => {
                return this.http.delete<any>(`brands/${brand.id}`).pipe(
                    map(response =>
                        BrandActions.deleteBrandCompleted({brand})
                    ),
                    catchError(error => {
                        return of(BrandActions.brandsError(error));
                    })
                );
            })
        )
    );

    public setBrand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrandActions.setBrandRequest),
            concatMap(({brand}) => {
                return this.http.put<any>(`brands/${brand.id}`, {brand}).pipe(
                    map(response =>
                        BrandActions.setBrandCompleted({brand})
                    ),
                    catchError(error => {
                        return of(BrandActions.brandsError(error));
                    })
                );
            })
        )
    );

}
