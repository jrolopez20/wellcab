import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VehicleRoutingModule} from './vehicle-routing.module';
import {AddVehicleComponent} from './views/add-vehicle/add-vehicle.component';
import {EditVehicleComponent} from './views/edit-vehicle/edit-vehicle.component';
import {ListVehicleComponent} from './views/list-vehicle/list-vehicle.component';
import {FlexModule} from '@angular/flex-layout';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@app/shared';
import {StoreModule} from '@ngrx/store';
import * as VehicleReducer from '@app/store/features/vehicle/vehicle.reducer';
import {EffectsModule} from '@ngrx/effects';
import {VehicleEffects} from '@app/store/features/vehicle/vehicle.effects';

@NgModule({
    declarations: [AddVehicleComponent, EditVehicleComponent, ListVehicleComponent],
    imports: [
        CommonModule,
        VehicleRoutingModule,
        FlexModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        StoreModule.forFeature(
            VehicleReducer.featureKey,
            VehicleReducer.reducer
        ),
        EffectsModule.forFeature([VehicleEffects])
    ]
})
export class VehicleModule {
}
