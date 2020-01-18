import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListCompanyComponent} from './views/list-company/list-company.component';
import {AddCompanyComponent} from './views/add-company/add-company.component';
import {EditCompanyComponent} from './views/edit-company/edit-company.component';


const routes: Routes = [
    {
        path: '',
        component: ListCompanyComponent
    },
    {
        path: 'add',
        component: AddCompanyComponent
    },
    {
        path: ':id',
        component: EditCompanyComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyRoutingModule {
}
