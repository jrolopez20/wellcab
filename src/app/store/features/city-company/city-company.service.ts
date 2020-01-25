import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as CityCompanyActions from './city-company.actions';

import {Observable} from 'rxjs';
import * as CityCompanySelectors from '@app/store/features/city-company/city-company.selectors';
import {AppState} from '@app/reducers';
import {CityCompany} from '@app/store/models/city-company.model';

@Injectable({
    providedIn: 'root'
})
export class CityCompanyService {

    constructor(private store: Store<AppState>) {
    }

    /**
     * Load cities
     * @param sort
     * @param order
     * @param page
     * @param filter
     */
    public loadCompaniesByCity({city, sort, order, page, filter}) {
        this.store.dispatch(CityCompanyActions.loadCityCompanies({city, sort, order, page, filter}));
    }

    public geCityCompaniesList$(): Observable<CityCompany[]> {
        return this.store.select(CityCompanySelectors.getCityCompaniesList);
    }

    public getCityCompaniesTotal$(): Observable<number> {
        return this.store.select(CityCompanySelectors.getCityCompaniesTotal);
    }

    public getIsLoading$(): Observable<boolean> {
        return this.store.select(CityCompanySelectors.getIsLoading);
    }

    public getError$(): Observable<boolean> {
        return this.store.select(CityCompanySelectors.getError);
    }

    public addCityCompany(cityCompany: CityCompany) {
        this.store.dispatch(
            CityCompanyActions.addCityCompanyRequest({
                cityCompany: {...cityCompany}
            })
        );
    }

    public setCityCompany(cityCompany: CityCompany) {
        this.store.dispatch(
            CityCompanyActions.setCityCompanyRequest({
                cityCompany: {...cityCompany}
            })
        );
    }

    public deleteCityCompany(cityCompany: CityCompany) {
        this.store.dispatch(
            CityCompanyActions.deleteCityCompanyRequest({
                cityCompany: {...cityCompany}
            })
        );
    }
}
