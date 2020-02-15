import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as DriverAssigmentActions from './driver-assigment.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {DriverAssigment} from '@app/store/models/driver-assigment.model';

@Injectable()
export class DriverAssigmentEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadDriverAssigments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DriverAssigmentActions.loadDriverAssigmentsRequest),
            concatMap(({licenseId, sort, order, page, limit, filter}) => {
                return this.http.get<any>(`licenses/${licenseId}/driver-assigments?search=${filter}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`).pipe(
                    map(response =>
                        DriverAssigmentActions.loadDriverAssigmentsCompleted({
                            driverAssigments: response.data,
                            total: response.pagination.total
                        })
                    ),
                    catchError(error => of(DriverAssigmentActions.driverAssigmentsError({error})))
                );
            })
        )
    );

    public addDriverAssigment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DriverAssigmentActions.addDriverAssigmentRequest),
            concatMap(({licenseId, driver}) => {
                return this.http.post<DriverAssigment>(`licenses/${licenseId}/driver-assigments`, {
                    driverUser: driver.id
                }).pipe(
                    map(response =>
                        DriverAssigmentActions.addDriverAssigmentCompleted({driverAssigment: {...response}})
                    ),
                    catchError(error => of(DriverAssigmentActions.driverAssigmentsError({error})))
                );
            })
        )
    );

    public setDriverAssigment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DriverAssigmentActions.setDriverAssigmentRequest),
            concatMap(({licenseId, driverAssigment}) => {
                return this.http.put<DriverAssigment>(`licenses/${licenseId}/driver-assigments/${driverAssigment.id}`, {
                    driverUser: driverAssigment.driverUser.id
                }).pipe(
                    map(response =>
                        DriverAssigmentActions.setDriverAssigmentCompleted({driverAssigment: {...response}})
                    ),
                    catchError(error => of(DriverAssigmentActions.driverAssigmentsError({error})))
                );
            })
        )
    );

    public unlinkDriver$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DriverAssigmentActions.unlinkDriverRequest),
            concatMap(({licenseId, driverAssigment}) => {
                return this.http.patch<DriverAssigment>(`licenses/${licenseId}/driver-assigments/${driverAssigment.id}`, {
                    status: 'finished'
                }).pipe(
                    map(response =>
                        DriverAssigmentActions.setDriverAssigmentCompleted({driverAssigment: {...response}})
                    ),
                    catchError(error => of(DriverAssigmentActions.driverAssigmentsError({error})))
                );
            })
        )
    );

}
