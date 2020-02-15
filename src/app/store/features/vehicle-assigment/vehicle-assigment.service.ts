import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as VehicleAssigmentActions from './vehicle-assigment.actions';
import {VehicleAssigment} from '@app/store/models/vehicle-assigment.model';
import {Observable} from 'rxjs';
import * as VehicleAssigmentSelectors from './vehicle-assigment.selectors';
import {AppState} from '@app/reducers';
import {Vehicle} from '@app/store/models/vehicle.model';

@Injectable({
    providedIn: 'root'
})
export class VehicleAssigmentService {

    constructor(private store: Store<AppState>) {
    }

    /**
     * Load Vehicle Assigments
     * @param licenseId
     * @param sort
     * @param order
     * @param page
     * @param limit
     * @param filter
     */
    public loadVehicleAssigments({licenseId, sort = '', order, page, limit, filter = ''}) {
        this.store.dispatch(VehicleAssigmentActions.loadVehicleAssigmentsRequest({licenseId, sort, order, page, limit, filter}));
    }

    public getVehicleAssigmentsList$(): Observable<VehicleAssigment[]> {
        return this.store.select(VehicleAssigmentSelectors.getVehicleAssigmentsList);
    }

    public getVehicleAssigmentsTotal$(): Observable<number> {
        return this.store.select(VehicleAssigmentSelectors.getVehicleAssigmentsTotal);
    }

    public getIsLoading$(): Observable<boolean> {
        return this.store.select(VehicleAssigmentSelectors.getIsLoading);
    }

    public getError$(): Observable<boolean> {
        return this.store.select(VehicleAssigmentSelectors.getError);
    }

    public addVehicleAssigment(licenseId: number, vehicle: Vehicle) {
        this.store.dispatch(VehicleAssigmentActions.addVehicleAssigmentRequest({licenseId, vehicle}));
    }

    public setVehicleAssigment(licenseId: number, vehicle: Vehicle) {
        this.store.dispatch(VehicleAssigmentActions.setVehicleAssigmentRequest({licenseId, vehicle}));
    }

    public unlinkVehicle(licenseId: number) {
        this.store.dispatch(VehicleAssigmentActions.unlinkVehicleRequest({licenseId}));
    }

}
