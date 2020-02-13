import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as ContractActions from './contract.actions';
import {Contract} from '@app/store/models/contract.model';
import {Observable} from 'rxjs';
import * as ContractSelectors from './contract.selectors';
import {AppState} from '@app/reducers';

@Injectable({
    providedIn: 'root'
})
export class ContractService {

    constructor(private store: Store<AppState>) {
    }

    /**
     * Load contracts
     * @param sort
     * @param order
     * @param page
     * @param limit
     * @param filter
     */
    public loadContracts({licenseId, sort = '', order, page, limit, filter = ''}) {
        this.store.dispatch(ContractActions.loadContractsRequest({licenseId, sort, order, page, limit, filter}));
    }

    public getContractsList$(): Observable<Contract[]> {
        return this.store.select(ContractSelectors.getContractsList);
    }

    public getContractsTotal$(): Observable<number> {
        return this.store.select(ContractSelectors.getContractsTotal);
    }

    public getIsLoading$(): Observable<boolean> {
        return this.store.select(ContractSelectors.getIsLoading);
    }

    public getError$(): Observable<boolean> {
        return this.store.select(ContractSelectors.getError);
    }

    public addContract(licenseId: number, contract: Contract) {
        this.store.dispatch(ContractActions.addContractRequest({licenseId, contract}));
    }

    public setContract(licenseId: number, contract: Contract) {
        this.store.dispatch(ContractActions.setContractRequest({licenseId, contract}));
    }

    /**
     * CLose the active contract for this license
     * @param licenseId
     */
    public closeContract(licenseId: number) {
        this.store.dispatch(ContractActions.closeContractRequest({licenseId}));
    }

}
