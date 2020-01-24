import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListLicenseComponent} from '@app/modules/admin/license/views/list-license/list-license.component';
import {AddLicenseComponent} from '@app/modules/admin/license/views/add-license/add-license.component';
import {EditLicenseComponent} from '@app/modules/admin/license/views/edit-license/edit-license.component';


const routes: Routes = [
    {
        path: '',
        component: ListLicenseComponent
    },
    {
        path: 'add',
        component: AddLicenseComponent
    },
    {
        path: ':id',
        component: EditLicenseComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LicenseRoutingModule {
}
