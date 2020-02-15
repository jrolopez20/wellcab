import {NgModule} from '@angular/core';
import {MenuItems} from './menu-items/menu-items';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {AppMaterialModule} from '@app/app-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';

import {LicenseModule} from '@app/shared/components/license/license.module';
import {UserModule} from '@app/shared/components/user/user.module';
import {VehicleModule} from '@app/shared/components/vehicle/vehicle.module';
import {CityModule} from '@app/shared/components/city/city.module';
import {CompanyModule} from '@app/shared/components/company/company.module';
import {ColorModule} from '@app/shared/components/color/color.module';
import {UtilsModule} from '@app/shared/utils/utils.module';
import {BrandModule} from '@app/shared/components/brand/brand.module';
import {ModelModule} from '@app/shared/components/model/model.module';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import {APP_DATE_FORMATS} from '@app/shared/adapters';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ContractModule} from '@app/shared/components/contract/contract.module';
import {SharedContractModule} from '@app/shared/components/shared-contract/shared-contract.module';
import {VehicleAssigmentModule} from '@app/shared/components/vehicle-assigment/vehicle-assigment.module';
import {DriverAssigmentModule} from '@app/shared/components/driver-assigment/driver-assigment.module';

/**/
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FlexModule,
        RouterModule
    ],
    exports: [
        AppMaterialModule,
        FlexModule,
        TranslateModule,
        UtilsModule,
        UserModule,
        CompanyModule,
        CityModule,
        LicenseModule,
        VehicleModule,
        ColorModule,
        BrandModule,
        ModelModule,
        ContractModule,
        SharedContractModule,
        VehicleAssigmentModule,
        DriverAssigmentModule
    ],
    providers: [
        MenuItems,
        {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
        {provide: DateAdapter, useClass: MomentDateAdapter}
    ]
})
export class SharedModule {
}
