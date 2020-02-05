import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as ColorActions from './color.actions';
import {Color} from '@app/store/models/color.model';
import {Observable} from 'rxjs';
import * as ColorSelectors from './color.selectors';
import {AppState} from '@app/reducers';

@Injectable({
    providedIn: 'root'
})
export class ColorService {

    constructor(private store: Store<AppState>) {
    }

    /**
     * Load colors
     * @param sort
     * @param order
     * @param page
     * @param limit
     * @param filter
     */
    public loadColors({sort = '', order, page, limit, filter = ''}) {
        this.store.dispatch(ColorActions.loadColorsRequest({sort, order, page, limit, filter}));
    }

    public getColorsList$(): Observable<Color[]> {
        return this.store.select(ColorSelectors.getColorsList);
    }

    public getColorsTotal$(): Observable<number> {
        return this.store.select(ColorSelectors.getColorsTotal);
    }

    public getIsLoading$(): Observable<boolean> {
        return this.store.select(ColorSelectors.getIsLoading);
    }

    public getError$(): Observable<boolean> {
        return this.store.select(ColorSelectors.getError);
    }

    public addColor(color: Color) {
        this.store.dispatch(
            ColorActions.addColorRequest({
                color: {...color}
            })
        );
    }

    public setColor(color: Color) {
        this.store.dispatch(
            ColorActions.setColorRequest({
                color: {...color}
            })
        );
    }
}
