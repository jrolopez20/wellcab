import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListCityComponent} from './components/list-city/list-city.component';
import {AddCityComponent} from './components/add-city/add-city.component';
import {EditCityComponent} from './components/edit-city/edit-city.component';

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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CityRoutingModule {
}
