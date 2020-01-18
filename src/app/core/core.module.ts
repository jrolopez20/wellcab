import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule} from '@angular/router';
import {MasterComponent} from './layouts/master.component';
import {AppHeaderComponent, AppLogoutDialogComponent} from './layouts/header/header.component';
import {AppSidebarComponent} from './layouts/sidebar/sidebar.component';
import {AppMaterialModule} from '../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../shared/shared.module';
import {PageTitleService} from './services/page-title.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MenuItems} from '../shared/menu-items/menu-items';
import {TranslateModule} from '@ngx-translate/core';
import {LanguagePickerComponent} from './components/language-picker/language-picker.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorInterceptor} from '@app/core/interceptors/error.interceptor';

@NgModule({
    declarations: [
        MasterComponent,
        AppHeaderComponent,
        AppSidebarComponent,
        AppLogoutDialogComponent,
        LanguagePickerComponent
    ],
    imports: [
        FlexLayoutModule,
        SharedModule,
        CommonModule,
        RouterModule,
        AppMaterialModule,
        BrowserAnimationsModule,
        CdkAccordionModule,
        TranslateModule
    ],
    entryComponents: [AppLogoutDialogComponent],
    exports: [
        MasterComponent,
        AppHeaderComponent,
        AppSidebarComponent,
        AppLogoutDialogComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        PageTitleService,
        MenuItems
    ],
})
export class CoreModule {
}
