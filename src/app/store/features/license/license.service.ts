import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as LicenseActions from './license.actions';
import {License} from '@app/store/models/license.model';
import {Observable} from 'rxjs';
import * as LicenseSelectors from './license.selectors';
import {AppState} from '@app/reducers';

@Injectable({
    providedIn: 'root'
})
export class LicenseService {

    constructor(private store: Store<AppState>) {
    }

    /**
     * Load licenses
     * @param sort
     * @param order
     * @param page
     * @param filter
     */
    public loadLicenses({sort, order, page, filter}) {
        this.store.dispatch(LicenseActions.loadLicensesRequest({sort, order, page, filter}));
    }

    public getLicensesList$(): Observable<License[]> {
        return this.store.select(LicenseSelectors.getLicensesList);
    }

    public getLicensesTotal$(): Observable<number> {
        return this.store.select(LicenseSelectors.getLicensesTotal);
    }

    public getIsLoading$(): Observable<boolean> {
        return this.store.select(LicenseSelectors.getIsLoading);
    }

    public getError$(): Observable<boolean> {
        return this.store.select(LicenseSelectors.getError);
    }

    public addLicense(license: License) {
        this.store.dispatch(
            LicenseActions.addLicenseRequest({
                license: {...license}
            })
        );
    }

    public setLicense(license: License) {
        this.store.dispatch(
            LicenseActions.setLicenseRequest({
                license: {...license}
            })
        );
    }

    public deleteLicense(license: License) {
        this.store.dispatch(
            LicenseActions.deleteLicenseRequest({
                license: {...license}
            })
        );
    }
}