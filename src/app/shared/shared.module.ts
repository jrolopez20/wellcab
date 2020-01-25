import {NgModule} from '@angular/core';
import {MenuItems} from './menu-items/menu-items';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {DeleteConfirmDialogComponent} from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {AppMaterialModule} from '@app/app-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';

import {CityCompaniesListComponent} from './components/city/city-companies-list/city-companies-list.component';
import {LicenseModule} from '@app/shared/components/license/license.module';
import {UserModule} from '@app/shared/components/user/user.module';
import {VehicleModule} from '@app/shared/components/vehicle/vehicle.module';
import {CityModule} from '@app/shared/components/city/city.module';
import {CompanyModule} from '@app/shared/components/company/company.module';

@NgModule({
    declarations: [
        SpinnerComponent,
        DeleteConfirmDialogComponent,
        CityCompaniesListComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FlexModule,
        RouterModule
    ],
    exports: [
        SpinnerComponent,
        DeleteConfirmDialogComponent,
        CityCompaniesListComponent,
        UserModule,
        CompanyModule,
        CityModule,
        LicenseModule,
        VehicleModule
    ],
    entryComponents: [DeleteConfirmDialogComponent],
    providers: [
        MenuItems
    ]
})
export class SharedModule {
}
