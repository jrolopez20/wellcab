import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LicenseRoutingModule} from './license-routing.module';
import {AddLicenseComponent} from './views/add-license/add-license.component';
import {EditLicenseComponent} from './views/edit-license/edit-license.component';
import {ListLicenseComponent} from './views/list-license/list-license.component';
import {FlexModule} from '@angular/flex-layout';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@app/shared';
import {EffectsModule} from '@ngrx/effects';
import {LicenseEffects} from '@app/store/features/license/license.effects';
import {StoreModule} from '@ngrx/store';
import * as LicenseReducer from '@app/store/features/license/license.reducer';


@NgModule({
    declarations: [AddLicenseComponent, EditLicenseComponent, ListLicenseComponent],
    imports: [
        CommonModule,
        LicenseRoutingModule,
        FlexModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        StoreModule.forFeature(
            LicenseReducer.featureKey,
            LicenseReducer.reducer
        ),
        EffectsModule.forFeature([LicenseEffects])
    ]
})
export class LicenseModule {
}
