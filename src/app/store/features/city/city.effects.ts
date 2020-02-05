import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as CityActions from './city.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable()
export class CityEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadCities$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CityActions.loadCities),
            concatMap(({sort, order, page, limit, filter}) => {
                return this.http.get<any>(`cities?search=${filter}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`).pipe(
                    map(response =>
                        CityActions.loadCitiesSuccess({cities: response.data, total: response.pagination.total})
                    ),
                    catchError(error =>
                        of(CityActions.citiesError({error}))
                    )
                );
            })
        )
    );

    public addCity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CityActions.addCityRequest),
            concatMap(({city}) => {
                return this.http.post<any>(`cities`, city).pipe(
                    map(response =>
                        CityActions.addCityCompleted({city: {...response}})
                    ),
                    catchError(error =>
                        of(CityActions.citiesError({error}))
                    )
                );
            })
        )
    );

    public editCity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CityActions.setCityRequest),
            concatMap(({id, city}) => {
                return this.http.put<any>(`cities/${id}`, city).pipe(
                    map(response =>
                        CityActions.setCityCompleted({city: {...response}})
                    ),
                    catchError(error =>
                        of(CityActions.citiesError({error}))
                    )
                );
            })
        )
    );


}
