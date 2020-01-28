import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListBrandComponent} from '@app/modules/admin/brand/views/list-brand/list-brand.component';

const routes: Routes = [
    {
        path: '',
        component: ListBrandComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BrandRoutingModule {
}
