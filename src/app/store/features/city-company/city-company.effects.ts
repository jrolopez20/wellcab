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
            concatMap(({cityId, sort, order, page, limit, filter}) => {
                return this.http.get<any>(`cities/${cityId}/companies-detail?search=${filter}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`).pipe(
                    map(response =>
                        CityCompanyActions.loadCityCompaniesSuccess({cityCompanies: response.data, total: response.pagination.total})
                    ),
                    catchError(error =>
                        of(CityCompanyActions.cityCompaniesError(error))
                    )
                );
            })
        )
    );

    public saveCityCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CityCompanyActions.saveCityCompanyRequest),
            concatMap(({cityId, cityCompany}) => {
                return this.http.put<any>(`cities/${cityId}/companies/${cityCompany.company.id}/detail`, {
                    postalCode: cityCompany.postalCode,
                    address: cityCompany.address
                }).pipe(
                    map(response =>
                        CityCompanyActions.saveCityCompanyCompleted({cityCompany: {...response}})
                    ),
                    catchError(error => of(CityCompanyActions.cityCompaniesError({error})))
                );
            })
        )
    );

    public toggleLinkCityCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CityCompanyActions.toggleLinkCityCompanyRequest),
            concatMap(({cityId, cityCompany}) => {
                return this.http.patch<any>(`cities/${cityId}/companies-detail/${cityCompany.id}`, {
                    status: cityCompany.unlinkedAt ? 'linked' : 'unlinked'
                }).pipe(
                    map(response =>
                        CityCompanyActions.toggleLinkCityCompanyCompleted({cityCompany: response})
                    ),
                    catchError(error => {
                        return of(CityCompanyActions.cityCompaniesError({error}));
                    })
                );
            })
        )
    );

}
