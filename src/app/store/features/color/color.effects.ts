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
            concatMap(({sort, order, page, filter}) => {
                return this.http.get<any>(`colors?filter=${filter}&sort=${sort}&order=${order}&page=${page}`).pipe(
                    map(response =>
                        ColorActions.loadColorsCompleted({colors: response.items, total: response.total})
                    ),
                    catchError(error =>
                        of(ColorActions.colorsError(error))
                    )
                );
            })
        )
    );

    public deleteColor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ColorActions.deleteColorRequest),
            concatMap(({color}) => {
                return this.http.delete<any>(`colors/${color.id}`).pipe(
                    map(response =>
                        ColorActions.deleteColorCompleted({color})
                    ),
                    catchError(error => {
                        return of(ColorActions.colorsError(error));
                    })
                );
            })
        )
    );

    public setColor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ColorActions.setColorRequest),
            concatMap(({color}) => {
                return this.http.put<any>(`colors/${color.id}`, {color}).pipe(
                    map(response =>
                        ColorActions.setColorCompleted({color})
                    ),
                    catchError(error => {
                        return of(ColorActions.colorsError(error));
                    })
                );
            })
        )
    );

}
