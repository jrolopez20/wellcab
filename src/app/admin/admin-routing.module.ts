import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '', redirectTo: 'users', pathMatch: 'full',
    },
    {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}