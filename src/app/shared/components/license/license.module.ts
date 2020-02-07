import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {LicenseListComponent} from '@app/shared/components/license/license-list/license-list.component';
import {LicenseFormComponent} from '@app/shared/components/license/license-form/license-form.component';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as LicenseReducer from '@app/store/features/license/license.reducer';
import {LicenseEffects} from '@app/store/features/license/license.effects';
import {UtilsModule} from '@app/shared/utils/utils.module';
import {MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {APP_DATE_FORMATS} from '@app/shared/adapters';


@NgModule({
    declarations: [
        LicenseListComponent,
        LicenseFormComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FlexModule,
        RouterModule,
        StoreModule.forFeature(
            LicenseReducer.featureKey,
            LicenseReducer.reducer
        ),
        EffectsModule.forFeature([LicenseEffects]),
        UtilsModule,
        MatMomentDateModule
    ],
    exports: [
        LicenseListComponent,
        LicenseFormComponent
    ],
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
        {provide: DateAdapter, useClass: MomentDateAdapter}
    ]
})
export class LicenseModule {
}
