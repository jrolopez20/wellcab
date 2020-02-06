import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as CompanyActions from './company.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable()
export class CompanyEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadCompanies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.loadCompanies),
            concatMap(({sort, order, page, limit, filter}) => {
                return this.http.get<any>(`companies?search=${filter}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`).pipe(
                    map(response =>
                        CompanyActions.loadCompaniesSuccess({companies: response.data, total: response.pagination.total})
                    ),
                    catchError(error =>
                        of(CompanyActions.companiesError({error}))
                    )
                );
            })
        )
    );

    public addCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.addCompanyRequest),
            concatMap(({company}) => {
                return this.http.post<any>(`companies`, company).pipe(
                    map(response =>
                        CompanyActions.addCompanyCompleted({company: {...response}})
                    ),
                    catchError(error =>
                        of(CompanyActions.companiesError({error}))
                    )
                );
            })
        )
    );

    public setCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.setCompanyRequest),
            concatMap(({id, company}) => {
                return this.http.put<any>(`companies/${id}`, company).pipe(
                    map(response =>
                        CompanyActions.setCompanyCompleted({company: {...response}})
                    ),
                    catchError(error =>
                        of(CompanyActions.companiesError({error}))
                    )
                );
            })
        )
    );

}
