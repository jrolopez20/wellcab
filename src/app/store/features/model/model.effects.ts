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
            concatMap(({brandId, sort, order, page, limit, filter}) => {
                return this.http.get<any>
                (`brands/${brandId}/models?search=${filter}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`).pipe(
                    map(response =>
                        ModelActions.loadModelsCompleted({models: response.data, total: response.pagination.total})
                    ),
                    catchError(error => of(ModelActions.modelsError({error})))
                );
            })
        )
    );

    public addModel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ModelActions.addModelRequest),
            concatMap(({brandId, model}) => {
                return this.http.post<any>(`brands/${brandId}/models`, model).pipe(
                    map(response =>
                        ModelActions.addModelCompleted({model: {...response}})
                    ),
                    catchError(error => of(ModelActions.modelsError({error})))
                );
            })
        )
    );

    public setModel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ModelActions.setModelRequest),
            concatMap(({brandId, model}) => {
                const {id, ...modelCopy} = model;
                return this.http.put<any>(`brands/${brandId}/models/${id}`, modelCopy).pipe(
                    map(response =>
                        ModelActions.setModelCompleted({model: {...response}})
                    ),
                    catchError(error => of(ModelActions.modelsError({error})))
                );
            })
        )
    );

}
