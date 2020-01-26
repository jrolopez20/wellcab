import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListColorComponent} from '@app/modules/admin/color/views/list-color/list-color.component';
import {AddColorComponent} from '@app/modules/admin/color/views/add-color/add-color.component';
import {EditColorComponent} from '@app/modules/admin/color/views/edit-color/edit-color.component';


const routes: Routes = [
    {
        path: '',
        component: ListColorComponent
    },
    {
        path: 'add',
        component: AddColorComponent
    },
    {
        path: ':id',
        component: EditColorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ColorRoutingModule {
}
