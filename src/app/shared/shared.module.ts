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

import {UserFormComponent} from '@app/shared/components/user/user-form/user-form.component';
import {UserListComponent} from '@app/shared/components/user/user-list/user-list.component';
import {VehicleListComponent} from './components/vehicle/vehicle-list/vehicle-list.component';
import {VehicleFormComponent} from './components/vehicle/vehicle-form/vehicle-form.component';

@NgModule({
    declarations: [
        SpinnerComponent,
        DeleteConfirmDialogComponent,
        UserFormComponent,
        UserListComponent,
        VehicleListComponent,
        VehicleFormComponent
    ],
    exports: [
        SpinnerComponent,
        DeleteConfirmDialogComponent,
        UserFormComponent,
        UserListComponent,
        VehicleListComponent,
        VehicleFormComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FlexModule,
        RouterModule
    ],
    entryComponents: [DeleteConfirmDialogComponent],
    providers: [
        MenuItems
    ]
})
export class SharedModule {
}
