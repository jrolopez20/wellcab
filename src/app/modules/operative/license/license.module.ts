import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LicenseRoutingModule} from './license-routing.module';
import {ListLicenseComponent} from './views/list-license/list-license.component';
import {SharedModule} from '@app/shared';
import {ContractHistoryComponent} from './views/contract-history/contract-history.component';
import { VehicleHistoryComponent } from './views/vehicle-history/vehicle-history.component';
import { DriverHistoryComponent } from './views/driver-history/driver-history.component';


@NgModule({
    declarations: [ListLicenseComponent, ContractHistoryComponent, VehicleHistoryComponent, DriverHistoryComponent],
    imports: [
        CommonModule,
        LicenseRoutingModule,
        SharedModule
    ]
})
export class LicenseModule {
}
