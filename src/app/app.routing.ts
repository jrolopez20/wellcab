import {Routes} from '@angular/router';

import {MasterComponent as MasterLayout} from './core/layouts/master.component';
import {LoginComponent} from './auth/components/login/login.component';
import {AuthGuard} from './auth/guards/auth.guard';
import {EntryPointComponent} from './entrypoint/components/entry-point/entry-point.component';
import {ProfileComponent} from './auth/components/profile/profile.component';

export const AppRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'entrypoint',
        component: EntryPointComponent,
        canActivate: [AuthGuard]
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
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'admin',
                loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
            }
        ]
    }
];
