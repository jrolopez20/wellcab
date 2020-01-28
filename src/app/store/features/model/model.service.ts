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
     * @param sort
     * @param order
     * @param page
     * @param filter
     */
    public loadModels({sort, order, page, filter}) {
        this.store.dispatch(ModelActions.loadModelsRequest({sort, order, page, filter}));
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

    public addModel(model: Model) {
        this.store.dispatch(
            ModelActions.addModelRequest({
                model: {...model}
            })
        );
    }

    public setModel(model: Model) {
        this.store.dispatch(
            ModelActions.setModelRequest({
                model: {...model}
            })
        );
    }

    public deleteModel(model: Model) {
        this.store.dispatch(
            ModelActions.deleteModelRequest({
                model: {...model}
            })
        );
    }

    public clearStore() {
        this.store.dispatch(ModelActions.clearStore());
    }
}
