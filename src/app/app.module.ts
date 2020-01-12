import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {AppRoutes} from './app.routing';
import {AppComponent} from './app.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppMaterialModule} from './app-material.module';

import {SharedModule} from './shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './reducers';
import {AuthModule} from './auth/auth.module';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {I18nModule} from './i18n.module';
import {EntrypointModule} from './entrypoint/entrypoint.module';
import {CoreModule} from './core/core.module';


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
        EntrypointModule,
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

