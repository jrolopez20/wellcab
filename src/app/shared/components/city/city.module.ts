import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CityListComponent} from '@app/shared/components/city/city-list/city-list.component';
import {CityFormComponent} from '@app/shared/components/city/city-form/city-form.component';
import {FlexModule} from '@angular/flex-layout';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import * as CityReducer from '@app/store/features/city/city.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CityEffects} from '@app/store/features/city/city.effects';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [CityListComponent, CityFormComponent],
    imports: [
        CommonModule,
        FlexModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        StoreModule.forFeature(
            CityReducer.featureKey,
            CityReducer.reducer
        ),
        EffectsModule.forFeature([CityEffects]),
    ],
    exports: [CityListComponent, CityFormComponent]
})
export class CityModule {
}