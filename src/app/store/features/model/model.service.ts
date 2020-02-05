import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as ModelActions from './model.actions';
import {Model} from '@app/store/models/model.model';
import {Observable} from 'rxjs';
import * as ModelSelectors from './model.selectors';
import {AppState} from '@app/reducers';

@Injectable({
    providedIn: 'root'
})
export class ModelService {

    constructor(private store: Store<AppState>) {
    }

    /**
     * Load models
     * @param brandId
     * @param sort
     * @param order
     * @param page
     * @param limit
     * @param filter
     */
    public loadModels({brandId, sort = '', order, page, limit, filter = ''}) {
        this.store.dispatch(ModelActions.loadModelsRequest({brandId, sort, order, page, limit, filter}));
    }

    public getModelsList$(): Observable<Model[]> {
        return this.store.select(ModelSelectors.getModelsList);
    }

    public getModelsTotal$(): Observable<number> {
        return this.store.select(ModelSelectors.getModelsTotal);
    }

    public getIsLoading$(): Observable<boolean> {
        return this.store.select(ModelSelectors.getIsLoading);
    }

    public getError$(): Observable<any> {
        return this.store.select(ModelSelectors.getError);
    }

    public addModel(brandId: number, model: Model) {
        this.store.dispatch(
            ModelActions.addModelRequest({brandId, model})
        );
    }

    public setModel(brandId: number, model: Model) {
        this.store.dispatch(
            ModelActions.setModelRequest({brandId, model})
        );
    }

    public clearStore() {
        this.store.dispatch(ModelActions.clearStore());
    }
}
