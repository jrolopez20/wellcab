import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Company} from '@app/store/models/company.model';
import * as CompanySelectors from '@app/store/features/company/company.selectors';
import * as CompanyActions from './company.actions';
import {AppState} from '@app/reducers';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    constructor(private store: Store<AppState>) {
    }

    /**
     * Load companies
     * @param sort
     * @param order
     * @param page
     * @param filter
     */
    public loadCompanies({sort, order, page, filter}) {
        this.store.dispatch(CompanyActions.loadCompanies({sort, order, page, filter}));
    }

    public getCompaniesList$(): Observable<Company[]> {
        return this.store.select(CompanySelectors.getCompaniesList);
    }

    public getCompaniesTotal$(): Observable<number> {
        return this.store.select(CompanySelectors.getCompaniesTotal);
    }

    public getIsLoading$(): Observable<boolean> {
        return this.store.select(CompanySelectors.getIsLoading);
    }

    public getError$(): Observable<boolean> {
        return this.store.select(CompanySelectors.getError);
    }

    public addCompany(company: Company) {
        this.store.dispatch(
            CompanyActions.addCompanyRequest({
                company: {...company}
            })
        );
    }

    public setCompany(company: Company) {
        this.store.dispatch(
            CompanyActions.setCompanyRequest({
                company: {...company}
            })
        );
    }

    public deleteCompany(company: Company) {
        this.store.dispatch(
            CompanyActions.deleteCompanyRequest({
                company: {...company}
            })
        );
    }
}
