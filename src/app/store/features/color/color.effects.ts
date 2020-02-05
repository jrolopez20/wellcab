import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as ColorActions from './color.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable()
export class ColorEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadColors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ColorActions.loadColorsRequest),
            concatMap(({sort, order, page, limit, filter}) => {
                return this.http.get<any>(`colors?search=${filter}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`).pipe(
                    map(response =>
                        ColorActions.loadColorsCompleted({colors: response.data, total: response.pagination.total})
                    ),
                    catchError(error =>
                        of(ColorActions.colorsError({error}))
                    )
                );
            })
        )
    );

    public addColor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ColorActions.addColorRequest),
            concatMap(({color}) => {
                return this.http.post<any>('colors', color).pipe(
                    map(response =>
                        ColorActions.setColorCompleted({color: {...response}})
                    ),
                    catchError(error => {
                        return of(ColorActions.colorsError({error}));
                    })
                );
            })
        )
    );

    public setColor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ColorActions.setColorRequest),
            concatMap(({color}) => {
                // Extract ID from color into a separate variable and put the rest in other one.
                const {id, ...colorCopy} = color;
                return this.http.put<any>(`colors/${id}`, colorCopy).pipe(
                    map(response =>
                        ColorActions.setColorCompleted({color})
                    ),
                    catchError(error => {
                        return of(ColorActions.colorsError({error}));
                    })
                );
            })
        )
    );

}
