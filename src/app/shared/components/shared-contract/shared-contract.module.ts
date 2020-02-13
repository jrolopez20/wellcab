import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedContractFormComponent} from './shared-contract-form/shared-contract-form.component';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {UtilsModule} from '@app/shared/utils/utils.module';
import {StoreModule} from '@ngrx/store';
import * as SharedContractReducer from '@app/store/features/shared-contract/shared-contract.reducer';
import {EffectsModule} from '@ngrx/effects';
import {SharedContractEffects} from '@app/store/features/shared-contract/shared-contract.effects';
import {SharedContractListComponent} from './shared-contract-list/shared-contract-list.component';


@NgModule({
    declarations: [SharedContractFormComponent, SharedContractListComponent],
    imports: [
        CommonModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FlexModule,
        RouterModule,
        UtilsModule,
        StoreModule.forFeature(
            SharedContractReducer.featureKey,
            SharedContractReducer.reducer
        ),
        EffectsModule.forFeature([SharedContractEffects])
    ],
    exports: [SharedContractListComponent],
    entryComponents: [SharedContractFormComponent]
})
export class SharedContractModule {
}
