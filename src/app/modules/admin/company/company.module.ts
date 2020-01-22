import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CompanyRoutingModule} from './company-routing.module';
import {AddCompanyComponent} from './views/add-company/add-company.component';
import {EditCompanyComponent} from './views/edit-company/edit-company.component';
import {ListCompanyComponent} from './views/list-company/list-company.component';
import {FlexModule} from '@angular/flex-layout';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import {StoreModule} from '@ngrx/store';
import * as CompanyReducer from '@app/store/features/company/company.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CompanyEffects} from '@app/store/features/company/company.effects';

@NgModule({
    declarations: [AddCompanyComponent, EditCompanyComponent, ListCompanyComponent, CompanyFormComponent, CompanyListComponent],
    imports: [
        CommonModule,
        CompanyRoutingModule,
        FlexModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forFeature(
            CompanyReducer.featureKey,
            CompanyReducer.reducer
        ),
        EffectsModule.forFeature([CompanyEffects])
    ]
})
export class CompanyModule {
}
