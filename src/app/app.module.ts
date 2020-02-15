import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LocationStrategy, PathLocationStrategy, registerLocaleData} from '@angular/common';
import {AppComponent} from './app.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppMaterialModule} from './app-material.module';
import {AppRoutingModule} from './app-routing.module';

import {SharedModule} from './shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './reducers';
import {AuthModule} from './modules/auth/auth.module';
import {EffectsModule} from '@ngrx/effects';
import {I18nModule} from './i18n.module';
import {CoreModule} from './core/core.module';
import {AuthService} from '@app/store/features/auth/auth.service';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        CoreModule,
        I18nModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        SharedModule,
        AuthModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        EffectsModule.forRoot([])
    ],
    providers: [
        AuthService,
        {provide: LOCALE_ID, useValue: 'es'},
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

