import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListLicenseComponent} from './views/list-license/list-license.component';
import {ContractHistoryComponent} from './views/contract-history/contract-history.component';
import {VehicleHistoryComponent} from '@app/modules/operative/license/views/vehicle-history/vehicle-history.component';
import {DriverHistoryComponent} from '@app/modules/operative/license/views/driver-history/driver-history.component';

const routes: Routes = [
    {
        path: '',
        component: ListLicenseComponent
    },
    {
        path: ':id/contracts',
        component: ContractHistoryComponent
    },
    {
        path: ':id/vehicles',
        component: VehicleHistoryComponent
    },
    {
        path: ':id/drivers',
        component: DriverHistoryComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LicenseRoutingModule {
}
