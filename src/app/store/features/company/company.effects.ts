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
            concatMap(({sort, order, page, filter}) => {
                return this.http.get<any>(`companies?filter=${filter}&sort=${sort}&order=${order}&page=${page}`).pipe(
                    map(response =>
                        CompanyActions.loadCompaniesSuccess({companies: response.items, total: response.total})
                    ),
                    catchError(error =>
                        of(CompanyActions.companiesError(error))
                    )
                );
            })
        )
    );

    public deleteCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.deleteCompanyRequest),
            concatMap(({company}) => {
                return this.http.delete<any>(`companies/${company.id}`).pipe(
                    map(response =>
                        CompanyActions.deleteCompanyCompleted({company})
                    ),
                    catchError(error => {
                        return of(CompanyActions.companiesError(error));
                    })
                );
            })
        )
    );

}
