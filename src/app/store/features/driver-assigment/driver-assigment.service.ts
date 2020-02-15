import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as DriverAssigmentActions from './driver-assigment.actions';
import {DriverAssigment} from '@app/store/models/driver-assigment.model';
import {Observable} from 'rxjs';
import * as DriverAssigmentSelectors from './driver-assigment.selectors';
import {AppState} from '@app/reducers';

@Injectable({
    providedIn: 'root'
})
export class DriverAssigmentService {

    constructor(private store: Store<AppState>) {
    }

    /**
     * Load Driver Assigments
     * @param sort
     * @param order
     * @param page
     * @param limit
     * @param filter
     */
    public loadDriverAssigments({licenseId, sort = '', order, page, limit, filter = ''}) {
        this.store.dispatch(DriverAssigmentActions.loadDriverAssigmentsRequest({licenseId, sort, order, page, limit, filter}));
    }

    public getDriverAssigmentsList$(): Observable<DriverAssigment[]> {
        return this.store.select(DriverAssigmentSelectors.getDriverAssigmentsList);
    }

    public getDriverAssigmentsTotal$(): Observable<number> {
        return this.store.select(DriverAssigmentSelectors.getDriverAssigmentsTotal);
    }

    public getIsLoading$(): Observable<boolean> {
        return this.store.select(DriverAssigmentSelectors.getIsLoading);
    }

    public getError$(): Observable<boolean> {
        return this.store.select(DriverAssigmentSelectors.getError);
    }

    public addDriverAssigment(licenseId: number, driverAssigment: DriverAssigment) {
        this.store.dispatch(DriverAssigmentActions.addDriverAssigmentRequest({licenseId, driverAssigment}));
    }

    public setDriverAssigment(licenseId: number, driverAssigment: DriverAssigment) {
        this.store.dispatch(DriverAssigmentActions.setDriverAssigmentRequest({licenseId, driverAssigment}));
    }

}
