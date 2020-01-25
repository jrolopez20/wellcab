import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CityRoutingModule} from './city-routing.module';
import {AddCityComponent} from './views/add-city/add-city.component';
import {EditCityComponent} from './views/edit-city/edit-city.component';
import {ListCityComponent} from './views/list-city/list-city.component';
import {CityCompaniesComponent} from './views/city-companies/city-companies.component';
import {SharedModule} from '@app/shared';

@NgModule({
    declarations: [AddCityComponent, EditCityComponent, ListCityComponent, CityCompaniesComponent],
    imports: [
        CommonModule,
        CityRoutingModule,
        SharedModule
    ]
})
export class CityModule {
}
