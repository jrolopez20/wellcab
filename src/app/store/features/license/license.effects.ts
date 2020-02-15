import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as LicenseActions from './license.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {License} from '@app/store/models/license.model';

@Injectable()
export class LicenseEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadLicenses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseActions.loadLicensesRequest),
            concatMap(({sort, order, page, limit, filter}) => {
                return this.http.get<any>(`licenses?search=${filter}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`).pipe(
                    map(response =>
                        LicenseActions.loadLicensesCompleted({licenses: response.data, total: response.pagination.total})
                    ),
                    catchError(error => of(LicenseActions.licensesError({error})))
                );
            })
        )
    );

    public findLincense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseActions.findLicenseRequest),
            concatMap(({licenseId}) => {
                return this.http.get<any>(`licenses/${licenseId}`).pipe(
                    map(response =>
                        LicenseActions.findLicenseCompleted({license: {...response}})
                    ),
                    catchError(error => of(LicenseActions.licensesError({error})))
                );
            })
        )
    );

    public addLicense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseActions.addLicenseRequest),
            concatMap(({license}) => {
                return this.http.post<License>(`licenses`, license).pipe(
                    map(response =>
                        LicenseActions.addLicenseCompleted({license: {...response}})
                    ),
                    catchError(error => of(LicenseActions.licensesError({error})))
                );
            })
        )
    );

    public setLicense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseActions.setLicenseRequest),
            concatMap(({license}) => {
                const {id, ...licenseCopy} = license;
                return this.http.put<License>(`licenses/${id}`, licenseCopy).pipe(
                    map(response =>
                        LicenseActions.setLicenseCompleted({license: {...response}})
                    ),
                    catchError(error => of(LicenseActions.licensesError({error})))
                );
            })
        )
    );

}
