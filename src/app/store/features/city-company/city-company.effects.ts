import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as CityCompanyActions from './city-company.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable()
export class CityCompanyEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadCityCompanies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CityCompanyActions.loadCityCompanies),
            concatMap(({city, sort, order, page, filter}) => {
                return this.http.get<any>(`cities?filter=${filter}&sort=${sort}&order=${order}&page=${page}`).pipe(
                    map(response =>
                        CityCompanyActions.loadCityCompaniesSuccess({cityCompanies: response.items, total: response.total})
                    ),
                    catchError(error =>
                        of(CityCompanyActions.cityCompaniesError(error))
                    )
                );
            })
        )
    );

    public deleteCityCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CityCompanyActions.deleteCityCompanyRequest),
            concatMap(({cityCompany}) => {
                return this.http.delete<any>(`cities/${cityCompany.id}`).pipe(
                    map(response =>
                        CityCompanyActions.deleteCityCompanyCompleted({cityCompany})
                    ),
                    catchError(error => {
                        return of(CityCompanyActions.cityCompaniesError(error));
                    })
                );
            })
        )
    );

}
