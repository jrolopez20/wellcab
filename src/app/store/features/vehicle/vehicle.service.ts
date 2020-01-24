import {Injectable} from '@angular/core';
import {props, Store} from '@ngrx/store';
import * as VehicleActions from './vehicle.actions';
import {Vehicle} from '@app/store/models/vehicle.model';
import {Observable} from 'rxjs';
import * as VehicleSelectors from './vehicle.selectors';
import {AppState} from '@app/reducers';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {

    constructor(private store: Store<AppState>) {
    }

    /**
     * Load vehicles
     * @param sort
     * @param order
     * @param page
     * @param filter
     */
    public loadVehicles({sort, order, page, filter}) {
        this.store.dispatch(VehicleActions.loadVehiclesRequest({sort, order, page, filter}));
    }

    public getVehiclesList$(): Observable<Vehicle[]> {
        return this.store.select(VehicleSelectors.getVehiclesList);
    }

    public getVehiclesTotal$(): Observable<number> {
        return this.store.select(VehicleSelectors.getVehiclesTotal);
    }

    public getIsLoading$(): Observable<boolean> {
        return this.store.select(VehicleSelectors.getIsLoading);
    }

    public getError$(): Observable<boolean> {
        return this.store.select(VehicleSelectors.getError);
    }

    public addVehicle(vehicle: Vehicle) {
        this.store.dispatch(
            VehicleActions.addVehicleRequest({
                vehicle: {...vehicle}
            })
        );
    }

    public setVehicle(vehicle: Vehicle) {
        this.store.dispatch(
            VehicleActions.setVehicleRequest({
                vehicle: {...vehicle}
            })
        );
    }

    public deleteVehicle(vehicle: Vehicle) {
        this.store.dispatch(
            VehicleActions.deleteVehicleRequest({
                vehicle: {...vehicle}
            })
        );
    }
}
