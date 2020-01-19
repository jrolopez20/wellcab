import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {MasterComponent as MasterLayout} from './core/layouts/master.component';
import {AuthGuard} from '@app/shared/guards/auth.guard';
import {LoginComponent} from '@app/modules/auth/views/login/login.component';
import {ProfileComponent} from '@app/modules/auth/views/profile/profile.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: MasterLayout,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'admin',
                loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
            }
        ]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
