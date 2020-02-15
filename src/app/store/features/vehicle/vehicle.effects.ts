import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as VehicleActions from './vehicle.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable()
export class VehicleEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadVehicles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleActions.loadVehiclesRequest),
            concatMap(({status, sort, order, page, limit, filter}) => {
                let url = `vehicles?search=${filter}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`;
                if (status) {
                    url += `&status=${status}`;
                }
                return this.http.get<any>(url).pipe(
                    map(response =>
                        VehicleActions.loadVehiclesCompleted({vehicles: response.data, total: response.pagination.total})
                    ),
                    catchError(error => of(VehicleActions.vehiclesError({error})))
                );
            })
        )
    );

    public addVehicle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleActions.addVehicleRequest),
            concatMap(({vehicle}) => {
                return this.http.post<any>(`vehicles`, vehicle).pipe(
                    map(response =>
                        VehicleActions.addVehicleCompleted({vehicle: {...response}})
                    ),
                    catchError(error => of(VehicleActions.vehiclesError({error})))
                );
            })
        )
    );

    public setVehicle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleActions.setVehicleRequest),
            concatMap(({vehicle}) => {
                const {id, ...vehicleCopy} = vehicle;
                return this.http.put<any>(`vehicles/${id}`, vehicleCopy).pipe(
                    map(response =>
                        VehicleActions.setVehicleCompleted({vehicle: {...response}})
                    ),
                    catchError(error => of(VehicleActions.vehiclesError({error})))
                );
            })
        )
    );

}
