import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as LicenseActions from './license.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable()
export class LicenseEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadLicenses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseActions.loadLicensesRequest),
            concatMap(({sort, order, page, filter}) => {
                return this.http.get<any>(`licenses?filter=${filter}&sort=${sort}&order=${order}&page=${page}`).pipe(
                    map(response =>
                        LicenseActions.loadLicensesCompleted({licenses: response.items, total: response.total})
                    ),
                    catchError(error =>
                        of(LicenseActions.licensesError(error))
                    )
                );
            })
        )
    );

    public deleteLicense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseActions.deleteLicenseRequest),
            concatMap(({license}) => {
                return this.http.delete<any>(`licenses/${license.id}`).pipe(
                    map(response =>
                        LicenseActions.deleteLicenseCompleted({license})
                    ),
                    catchError(error => {
                        return of(LicenseActions.licensesError(error));
                    })
                );
            })
        )
    );

    public setLicense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseActions.setLicenseRequest),
            concatMap(({license}) => {
                return this.http.put<any>(`licenses/${license.id}`, {license}).pipe(
                    map(response =>
                        LicenseActions.setLicenseCompleted({license})
                    ),
                    catchError(error => {
                        return of(LicenseActions.licensesError(error));
                    })
                );
            })
        )
    );

}
