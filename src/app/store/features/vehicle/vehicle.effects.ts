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
            concatMap(({sort, order, page, filter}) => {
                return this.http.get<any>(`vehicles?filter=${filter}&sort=${sort}&order=${order}&page=${page}`).pipe(
                    map(response =>
                        VehicleActions.loadVehiclesCompleted({vehicles: response.items, total: response.total})
                    ),
                    catchError(error =>
                        of(VehicleActions.vehiclesError(error))
                    )
                );
            })
        )
    );

    public deleteVehicle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleActions.deleteVehicleRequest),
            concatMap(({vehicle}) => {
                return this.http.delete<any>(`users/${vehicle.id}`).pipe(
                    map(response =>
                        VehicleActions.deleteVehicleCompleted({vehicle})
                    ),
                    catchError(error => {
                        return of(VehicleActions.vehiclesError(error));
                    })
                );
            })
        )
    );

    public setVehicle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleActions.setVehicleRequest),
            concatMap(({vehicle}) => {
                return this.http.put<any>(`users/${vehicle.id}`, {vehicle}).pipe(
                    map(response =>
                        VehicleActions.setVehicleCompleted({vehicle})
                    ),
                    catchError(error => {
                        return of(VehicleActions.vehiclesError(error));
                    })
                );
            })
        )
    );

}