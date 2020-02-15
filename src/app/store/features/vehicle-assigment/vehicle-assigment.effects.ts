import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as VehicleAssigmentActions from './vehicle-assigment.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {VehicleAssigment} from '@app/store/models/vehicle-assigment.model';

@Injectable()
export class VehicleAssigmentEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadVehicleAssigments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleAssigmentActions.loadVehicleAssigmentsRequest),
            concatMap(({licenseId, sort, order, page, limit, filter}) => {
                return this.http.get<any>(`licenses/${licenseId}/vehicle-assigments?search=${filter}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`).pipe(
                    map(response =>
                        VehicleAssigmentActions.loadVehicleAssigmentsCompleted({
                            vehicleAssigments: response.data,
                            total: response.pagination.total
                        })
                    ),
                    catchError(error => of(VehicleAssigmentActions.vehicleAssigmentsError({error})))
                );
            })
        )
    );

    public addVehicleAssigment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleAssigmentActions.addVehicleAssigmentRequest),
            concatMap(({licenseId, vehicle}) => {
                return this.http.post<VehicleAssigment>(`licenses/${licenseId}/vehicle-assigments`, {
                    vehicle: vehicle.id
                }).pipe(
                    map(response =>
                        VehicleAssigmentActions.addVehicleAssigmentCompleted({vehicleAssigment: {...response}})
                    ),
                    catchError(error => of(VehicleAssigmentActions.vehicleAssigmentsError({error})))
                );
            })
        )
    );

    public setVehicleAssigment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleAssigmentActions.setVehicleAssigmentRequest),
            concatMap(({licenseId, vehicle}) => {
                return this.http.put<VehicleAssigment>(`licenses/${licenseId}/vehicle-assigments`, {
                    vehicle: vehicle.id
                }).pipe(
                    map(response =>
                        VehicleAssigmentActions.setVehicleAssigmentCompleted({vehicleAssigment: {...response}})
                    ),
                    catchError(error => of(VehicleAssigmentActions.vehicleAssigmentsError({error})))
                );
            })
        )
    );

    public unlinkVehicle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleAssigmentActions.unlinkVehicleRequest),
            concatMap(({licenseId}) => {
                return this.http.patch<VehicleAssigment>(`licenses/${licenseId}/vehicle-assigments`, {
                    status: 'finished'
                }).pipe(
                    map(response =>
                        VehicleAssigmentActions.unlinkVehicleCompleted({vehicleAssigment: {...response}})
                    ),
                    catchError(error => of(VehicleAssigmentActions.vehicleAssigmentsError({error})))
                );
            })
        )
    );

}
