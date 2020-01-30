import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompanyFormComponent} from '@app/shared/components/company/company-form/company-form.component';
import {CompanyListComponent} from '@app/shared/components/company/company-list/company-list.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {RouterModule} from '@angular/router';
import * as CompanyReducer from '@app/store/features/company/company.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CompanyEffects} from '@app/store/features/company/company.effects';
import { CompanyListDialogComponent } from './company-list-dialog/company-list-dialog.component';
import {UtilsModule} from '@app/shared/utils/utils.module';


@NgModule({
    declarations: [CompanyFormComponent, CompanyListComponent, CompanyListDialogComponent],
    imports: [
        CommonModule,
        FlexModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        StoreModule.forFeature(
            CompanyReducer.featureKey,
            CompanyReducer.reducer
        ),
        EffectsModule.forFeature([CompanyEffects]),
        FlexLayoutModule,
        UtilsModule
    ],
    exports: [CompanyFormComponent, CompanyListComponent, CompanyListDialogComponent],
    entryComponents:[CompanyListDialogComponent]
})
export class CompanyModule {
}
