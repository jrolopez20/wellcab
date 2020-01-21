import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './views/login/login.component';
import {AppMaterialModule} from '@app/app-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {fakeBackendProvider} from './interceptors/fake-backend';
import {FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {ProfileComponent} from './views/profile/profile.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as authReducer from '@app/store/features/auth/auth.reducer';
import {AuthEffects} from '@app/store/features/auth/auth.effects';

@NgModule({
    declarations: [LoginComponent, ProfileComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppMaterialModule,
        FlexModule,
        TranslateModule,
        RouterModule,
        StoreModule.forFeature(
            authReducer.featureKey,
            authReducer.reducer
        ),
        EffectsModule.forFeature([AuthEffects])
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},

        // provider used to create fake backend
        fakeBackendProvider
    ],
    exports: [
        ProfileComponent
    ]
})
export class AuthModule {
}
