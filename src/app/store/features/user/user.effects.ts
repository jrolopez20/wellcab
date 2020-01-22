import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as CityActions from './city.actions';
import {catchError, concatMap, map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable()
export class CityEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadCities$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CityActions.loadCities),
            concatMap(({sort, order, page, filter}) => {
                return this.http.get<any>(`cities?filter=${filter}&sort=${sort}&order=${order}&page=${page}`).pipe(
                    map(response =>
                        CityActions.loadCitiesSuccess({cities: response.items, total: response.total})
                    ),
                    catchError(error =>
                        of(CityActions.citiesError(error))
                    )
                );
            })
        )
    );

    public deleteCity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CityActions.deleteCityRequest),
            concatMap(({city}) => {
                return this.http.delete<any>(`cities/${city.id}`).pipe(
                    map(response =>
                        CityActions.deleteCityCompleted({city})
                    ),
                    catchError(error => {
                        return of(CityActions.citiesError(error));
                    })
                );
            })
        )
    );

}
