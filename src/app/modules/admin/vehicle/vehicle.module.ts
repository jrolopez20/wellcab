import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VehicleRoutingModule} from './vehicle-routing.module';
import {AddVehicleComponent} from './views/add-vehicle/add-vehicle.component';
import {EditVehicleComponent} from './views/edit-vehicle/edit-vehicle.component';
import {ListVehicleComponent} from './views/list-vehicle/list-vehicle.component';
import {SharedModule} from '@app/shared';

@NgModule({
    declarations: [AddVehicleComponent, EditVehicleComponent, ListVehicleComponent],
    imports: [
        CommonModule,
        VehicleRoutingModule,
        SharedModule
    ]
})
export class VehicleModule {
}
