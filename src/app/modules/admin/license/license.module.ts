import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LicenseRoutingModule} from './license-routing.module';
import {AddLicenseComponent} from './views/add-license/add-license.component';
import {EditLicenseComponent} from './views/edit-license/edit-license.component';
import {ListLicenseComponent} from './views/list-license/list-license.component';
import {SharedModule} from '@app/shared/shared.module';
import {ContractHistoryComponent} from './views/contract-history/contract-history.component';

@NgModule({
    declarations: [AddLicenseComponent, EditLicenseComponent, ListLicenseComponent, ContractHistoryComponent],
    imports: [
        CommonModule,
        LicenseRoutingModule,
        SharedModule
    ]
})
export class LicenseModule {
}
