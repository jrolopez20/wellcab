import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CompanyRoutingModule} from './company-routing.module';
import {AddCompanyComponent} from './views/add-company/add-company.component';
import {EditCompanyComponent} from './views/edit-company/edit-company.component';
import {ListCompanyComponent} from './views/list-company/list-company.component';
import {SharedModule} from '@app/shared';

@NgModule({
    declarations: [AddCompanyComponent, EditCompanyComponent, ListCompanyComponent],
    imports: [
        CommonModule,
        CompanyRoutingModule,
        SharedModule
    ]
})
export class CompanyModule {
}
