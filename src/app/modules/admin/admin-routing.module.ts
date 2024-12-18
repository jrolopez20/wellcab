import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '', redirectTo: 'users', pathMatch: 'full'
    },
    {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
        path: 'companies',
        loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
    },
    {
        path: 'cities',
        loadChildren: () => import('./city/city.module').then(m => m.CityModule)
    },
    {
        path: 'vehicles',
        loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule)
    },
    {
        path: 'licenses',
        loadChildren: () => import('./license/license.module').then(m => m.LicenseModule)
    },
    {
        path: 'brands',
        loadChildren: () => import('./brand/brand.module').then(m => m.BrandModule)
    },
    {
        path: 'colors',
        loadChildren: () => import('./color/color.module').then(m => m.ColorModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
