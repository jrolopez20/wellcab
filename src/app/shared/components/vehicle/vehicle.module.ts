import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VehicleListComponent} from '@app/shared/components/vehicle/vehicle-list/vehicle-list.component';
import {VehicleFormComponent} from '@app/shared/components/vehicle/vehicle-form/vehicle-form.component';
import {StoreModule} from '@ngrx/store';
import * as VehicleReducer from '@app/store/features/vehicle/vehicle.reducer';
import {EffectsModule} from '@ngrx/effects';
import {VehicleEffects} from '@app/store/features/vehicle/vehicle.effects';
import {FlexModule} from '@angular/flex-layout';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {UtilsModule} from '@app/shared/utils/utils.module';
import {VehicleListDialogComponent} from './vehicle-list-dialog/vehicle-list-dialog.component';

@NgModule({
    declarations: [VehicleListComponent, VehicleFormComponent, VehicleListDialogComponent],
    imports: [
        CommonModule,
        FlexModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        NgxMatSelectSearchModule,
        StoreModule.forFeature(
            VehicleReducer.featureKey,
            VehicleReducer.reducer
        ),
        EffectsModule.forFeature([VehicleEffects]),
        UtilsModule
    ],
    exports: [VehicleListComponent, VehicleFormComponent],
    entryComponents: [VehicleListDialogComponent]
})
export class VehicleModule {
}
