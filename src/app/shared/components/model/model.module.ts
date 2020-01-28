import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModelListComponent} from './model-list/model-list.component';
import {FlexModule} from '@angular/flex-layout';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import * as ModelReducer from '@app/store/features/model/model.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ModelEffects} from '@app/store/features/model/model.effects';
import {ModelFormComponent} from './model-form/model-form.component';

@NgModule({
    declarations: [ModelListComponent, ModelFormComponent],
    imports: [
        CommonModule,
        FlexModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        StoreModule.forFeature(
            ModelReducer.featureKey,
            ModelReducer.reducer
        ),
        EffectsModule.forFeature([ModelEffects]),
    ],
    exports: [ModelListComponent],
    entryComponents: [ModelFormComponent]
})
export class ModelModule {
}
