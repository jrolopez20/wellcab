import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CityRoutingModule} from './city-routing.module';
import {AddCityComponent} from './views/add-city/add-city.component';
import {EditCityComponent} from './views/edit-city/edit-city.component';
import {ListCityComponent} from './views/list-city/list-city.component';
import {FlexModule} from '@angular/flex-layout';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [AddCityComponent, EditCityComponent, ListCityComponent],
    imports: [
        CommonModule,
        CityRoutingModule,
        FlexModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class CityModule {
}
