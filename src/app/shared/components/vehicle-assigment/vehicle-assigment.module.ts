import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VehicleAssigmentFormComponent} from './vehicle-assigment-form/vehicle-assigment-form.component';
import {VehicleAssigmentListComponent} from './vehicle-assigment-list/vehicle-assigment-list.component';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {UtilsModule} from '@app/shared/utils/utils.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as VehicleAssigmentReducer from '@app/store/features/vehicle-assigment/vehicle-assigment.reducer';
import {VehicleAssigmentEffects} from '@app/store/features/vehicle-assigment/vehicle-assigment.effects';


@NgModule({
    declarations: [VehicleAssigmentListComponent, VehicleAssigmentFormComponent],
    imports: [
        CommonModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FlexModule,
        RouterModule,
        UtilsModule,
        StoreModule.forFeature(
            VehicleAssigmentReducer.featureKey,
            VehicleAssigmentReducer.reducer
        ),
        EffectsModule.forFeature([VehicleAssigmentEffects])
    ],
    exports: [VehicleAssigmentListComponent],
    entryComponents: [VehicleAssigmentFormComponent]
})
export class VehicleAssigmentModule {
}
