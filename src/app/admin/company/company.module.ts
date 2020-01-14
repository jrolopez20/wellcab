import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CompanyRoutingModule} from './company-routing.module';
import {AddCompanyComponent} from './components/add-company/add-company.component';
import {EditCompanyComponent} from './components/edit-company/edit-company.component';
import {ListCompanyComponent} from './components/list-company/list-company.component';
import {FlexModule} from '@angular/flex-layout';
import {AppMaterialModule} from '../../app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [AddCompanyComponent, EditCompanyComponent, ListCompanyComponent],
    imports: [
        CommonModule,
        CompanyRoutingModule,
        FlexModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class CompanyModule {
}
