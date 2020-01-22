import {Injectable} from '@angular/core';
import {props, Store} from '@ngrx/store';
import * as CityActions from './city.actions';
import {City} from '@app/store/models/city.model';
import {Observable} from 'rxjs';
import * as CitySelectors from '@app/store/features/city/city.selectors';
import {AppState} from '@app/reducers';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor(private store: Store<AppState>) {
    }

    /**
     * Load cities
     * @param sort
     * @param order
     * @param page
     * @param filter
     */
    public loadCities({sort, order, page, filter}) {
        this.store.dispatch(CityActions.loadCities({sort, order, page, filter}));
    }

    public getCitiesList$(): Observable<City[]> {
        return this.store.select(CitySelectors.getCitiesList);
    }

    public getCitiesTotal$(): Observable<number> {
        return this.store.select(CitySelectors.getCitiesTotal);
    }

    public getIsLoading$(): Observable<boolean> {
        return this.store.select(CitySelectors.getIsLoading);
    }

    public getError$(): Observable<boolean> {
        return this.store.select(CitySelectors.getError);
    }

    public addCity(city: City) {
        this.store.dispatch(
            CityActions.addCityRequest({
                city: {...city}
            })
        );
    }

    public setCity(city: City) {
        this.store.dispatch(
            CityActions.setCityRequest({
                city: {...city}
            })
        );
    }

    public deleteCity(city: City) {
        this.store.dispatch(
            CityActions.deleteCityRequest({
                city: {...city}
            })
        );
    }
}
