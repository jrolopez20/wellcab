import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListVehicleComponent} from '@app/modules/admin/vehicle/views/list-vehicle/list-vehicle.component';
import {AddVehicleComponent} from '@app/modules/admin/vehicle/views/add-vehicle/add-vehicle.component';
import {EditVehicleComponent} from '@app/modules/admin/vehicle/views/edit-vehicle/edit-vehicle.component';

const routes: Routes = [
    {
        path: '', component: ListVehicleComponent
    },
    {
        path: 'add', component: AddVehicleComponent
    },
    {
        path: ':id', component: EditVehicleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VehicleRoutingModule {
}
