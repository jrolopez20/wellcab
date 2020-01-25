import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListCityComponent} from './views/list-city/list-city.component';
import {AddCityComponent} from './views/add-city/add-city.component';
import {EditCityComponent} from './views/edit-city/edit-city.component';
import {CityCompaniesComponent} from './views/city-companies/city-companies.component';

const routes: Routes = [
    {
        path: '',
        component: ListCityComponent
    }, {
        path: 'add',
        component: AddCityComponent
    }, {
        path: ':id',
        component: EditCityComponent
    }, {
        path: ':id/companies',
        component: CityCompaniesComponent
    }, {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CityRoutingModule {
}
