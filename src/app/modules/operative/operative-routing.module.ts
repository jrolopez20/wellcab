import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '', redirectTo: 'licenses', pathMatch: 'full'
    },
    {
        path: 'licenses',
        loadChildren: () => import('./license/license.module').then(m => m.LicenseModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OperativeRoutingModule {
}
