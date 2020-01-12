import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule} from '@angular/router';
import {MasterComponent} from './layouts/master.component';
import {AppHeaderComponent, AppLogoutDialogComponent} from './layouts/header/header.component';
import {AppSidebarComponent} from './layouts/sidebar/sidebar.component';
import {AppMaterialModule} from '../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        MasterComponent,
        AppHeaderComponent,
        AppSidebarComponent,
        AppLogoutDialogComponent
    ],
    imports: [
        FlexLayoutModule,
        SharedModule,
        CommonModule,
        RouterModule,
        AppMaterialModule,
    ],
    entryComponents: [AppLogoutDialogComponent],
    exports: [
        MasterComponent,
        AppHeaderComponent,
        AppSidebarComponent,
        AppLogoutDialogComponent
    ]
})
export class CoreModule {
}
