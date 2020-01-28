import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrandListComponent} from './brand-list/brand-list.component';
import {BrandFormComponent} from './brand-form/brand-form.component';
import {FlexModule} from '@angular/flex-layout';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import * as BrandReducer from '@app/store/features/brand/brand.reducer';
import {EffectsModule} from '@ngrx/effects';
import {BrandEffects} from '@app/store/features/brand/brand.effects';


@NgModule({
    declarations: [BrandListComponent, BrandFormComponent],
    imports: [
        CommonModule,
        FlexModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        StoreModule.forFeature(
            BrandReducer.featureKey,
            BrandReducer.reducer
        ),
        EffectsModule.forFeature([BrandEffects]),
    ],
    exports: [BrandListComponent, BrandFormComponent],
    entryComponents: [BrandFormComponent]
})
export class BrandModule {
}
