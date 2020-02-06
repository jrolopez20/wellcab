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
     * Load Companies detail
     * @param cityId
     * @param sort
     * @param order
     * @param page
     * @param limit
     * @param filter
     */
    public loadCompaniesByCity({cityId, sort = '', order, page, limit, filter = ''}) {
        this.store.dispatch(CityCompanyActions.loadCityCompanies({cityId, sort, order, page, limit, filter}));
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

    public saveCityCompany(cityId: number, cityCompany: CityCompany) {
        this.store.dispatch(CityCompanyActions.saveCityCompanyRequest({cityId, cityCompany}));
    }

    /**
     * Toggle link a company in a city
     * @param cityId
     * @param cityCompany
     */
    public toggleLinkCityCompany(cityId: number, cityCompany: CityCompany) {
        this.store.dispatch(CityCompanyActions.toggleLinkCityCompanyRequest({cityId, cityCompany}));
    }
}
