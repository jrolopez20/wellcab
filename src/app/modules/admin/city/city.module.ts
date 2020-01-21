import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CityRoutingModule} from './city-routing.module';
import {AddCityComponent} from './views/add-city/add-city.component';
import {EditCityComponent} from './views/edit-city/edit-city.component';
import {ListCityComponent} from './views/list-city/list-city.component';
import {FlexModule} from '@angular/flex-layout';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import * as fromCityStore from '@app/store/features/city/city.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CityEffects} from '@app/store/features/city/city.effects';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityFormComponent } from './components/city-form/city-form.component';

@NgModule({
    declarations: [AddCityComponent, EditCityComponent, ListCityComponent, CityListComponent, CityFormComponent],
    imports: [
        CommonModule,
        CityRoutingModule,
        FlexModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forFeature(
            fromCityStore.featureKey,
            fromCityStore.reducer
        ),
        EffectsModule.forFeature([CityEffects])
    ]
})
export class CityModule {
}
