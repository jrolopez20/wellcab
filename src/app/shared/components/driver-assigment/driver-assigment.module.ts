import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {UtilsModule} from '@app/shared/utils/utils.module';
import {StoreModule} from '@ngrx/store';
import * as DriverAssigmentReducer from '@app/store/features/driver-assigment/driver-assigment.reducer';
import {EffectsModule} from '@ngrx/effects';
import {DriverAssigmentEffects} from '@app/store/features/driver-assigment/driver-assigment.effects';
import {DriverAssigmentListComponent} from './driver-assigment-list/driver-assigment-list.component';
import {DriverAssigmentFormComponent} from './driver-assigment-form/driver-assigment-form.component';


@NgModule({
    declarations: [DriverAssigmentListComponent, DriverAssigmentFormComponent],
    imports: [
        CommonModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FlexModule,
        RouterModule,
        UtilsModule,
        StoreModule.forFeature(
            DriverAssigmentReducer.featureKey,
            DriverAssigmentReducer.reducer
        ),
        EffectsModule.forFeature([DriverAssigmentEffects])
    ],
    exports: [DriverAssigmentListComponent],
    entryComponents: [DriverAssigmentFormComponent]
})
export class DriverAssigmentModule {
}
