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
