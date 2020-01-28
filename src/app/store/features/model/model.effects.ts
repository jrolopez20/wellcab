import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as ModelActions from './model.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable()
export class ModelEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadModels$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ModelActions.loadModelsRequest),
            concatMap(({sort, order, page, filter}) => {
                return this.http.get<any>(`models?filter=${filter}&sort=${sort}&order=${order}&page=${page}`).pipe(
                    map(response =>
                        ModelActions.loadModelsCompleted({models: response.items, total: response.total})
                    ),
                    catchError(error => of(ModelActions.modelsError({error})))
                );
            })
        )
    );

    public deleteModel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ModelActions.deleteModelRequest),
            concatMap(({model}) => {
                return this.http.delete<any>(`models/${model.id}`).pipe(
                    map(response =>
                        ModelActions.deleteModelCompleted({model})
                    ),
                    catchError(error => of(ModelActions.modelsError({error})))
                );
            })
        )
    );

    public addModel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ModelActions.addModelRequest),
            concatMap(({model}) => {
                return this.http.post<any>('models', {model}).pipe(
                    map(response =>
                        ModelActions.addModelCompleted({model})
                    ),
                    catchError(error => {
                        return of(ModelActions.modelsError({error}));
                    })
                );
            })
        )
    );

    public setModel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ModelActions.setModelRequest),
            concatMap(({model}) => {
                return this.http.put<any>(`models/${model.id}`, {model}).pipe(
                    map(response =>
                        ModelActions.setModelCompleted({model})
                    ),
                    catchError(error => of(ModelActions.modelsError({error})))
                );
            })
        )
    );

}
