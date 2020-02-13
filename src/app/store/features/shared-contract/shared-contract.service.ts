import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as SharedContractActions from './shared-contract.actions';
import {SharedContract} from '@app/store/models/shared-contract.model';
import {Observable} from 'rxjs';
import * as SharedContractSelectors from './shared-contract.selectors';
import {AppState} from '@app/reducers';

@Injectable({
    providedIn: 'root'
})
export class SharedContractService {

    constructor(private store: Store<AppState>) {
    }

    /**
     * Load sharedContracts
     * @param sort
     * @param order
     * @param page
     * @param limit
     * @param filter
     */
    public loadSharedContracts({licenseId, contractId, sort = '', order, page, limit, filter = ''}) {
        this.store.dispatch(SharedContractActions.loadSharedContractsRequest({licenseId, contractId, sort, order, page, limit, filter}));
    }

    public getSharedContractsList$(): Observable<SharedContract[]> {
        return this.store.select(SharedContractSelectors.getSharedContractsList);
    }

    public getSharedContractsTotal$(): Observable<number> {
        return this.store.select(SharedContractSelectors.getSharedContractsTotal);
    }

    public getIsLoading$(): Observable<boolean> {
        return this.store.select(SharedContractSelectors.getIsLoading);
    }

    public getError$(): Observable<boolean> {
        return this.store.select(SharedContractSelectors.getError);
    }

    public addSharedContract(licenseId: number, sharedContract: SharedContract) {
        this.store.dispatch(SharedContractActions.addSharedContractRequest({licenseId, sharedContract}));
    }

    public setSharedContract(licenseId: number, sharedContract: SharedContract) {
        this.store.dispatch(SharedContractActions.setSharedContractRequest({licenseId, sharedContract}));
    }

    public closeSharedContract(licenseId: number) {
        this.store.dispatch(SharedContractActions.closeSharedContractRequest({licenseId}));
    }

    public clearStore() {
        this.store.dispatch(SharedContractActions.clearStore());
    }

}
