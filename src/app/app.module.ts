import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {AppRoutes} from './app.routing';
import {AppComponent} from './app.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {FullComponent} from './layouts/full/full.component';
import {AppHeaderComponent, AppLogoutDialogComponent} from './layouts/full/header/header.component';
import {AppSidebarComponent} from './layouts/full/sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppMaterialModule} from './app-material.module';

import {SharedModule} from './shared/shared.module';
import {SpinnerComponent} from './shared/spinner.component';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './reducers';
import {AuthModule} from './auth/auth.module';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {I18nModule} from './i18n.module';


@NgModule({
    declarations: [
        AppComponent,
        FullComponent,
        AppHeaderComponent,
        AppLogoutDialogComponent,
        SpinnerComponent,
        AppSidebarComponent
    ],
    entryComponents: [AppLogoutDialogComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        I18nModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        SharedModule,
        AuthModule,
        RouterModule.forRoot(AppRoutes, {
            preloadingStrategy: PreloadAllModules
        }),
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        EffectsModule.forRoot([AppEffects]),
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

