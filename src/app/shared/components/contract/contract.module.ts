import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import * as ContractReducer from '@app/store/features/contract/contract.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ContractEffects} from '@app/store/features/contract/contract.effects';
import {UtilsModule} from '@app/shared/utils/utils.module';
import { ContractFormComponent } from './contract-form/contract-form.component';


@NgModule({
    declarations: [ContractFormComponent],
    imports: [
        CommonModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FlexModule,
        RouterModule,
        StoreModule.forFeature(
            ContractReducer.featureKey,
            ContractReducer.reducer
        ),
        EffectsModule.forFeature([ContractEffects]),
        UtilsModule
    ],
    entryComponents: [ContractFormComponent]
})
export class ContractModule {
}
