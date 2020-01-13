import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {AppMaterialModule} from '../app-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {fakeBackendProvider} from './helpers/fake-backend';
import {FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {ProfileComponent} from './components/profile/profile.component';

@NgModule({
    declarations: [LoginComponent, ProfileComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppMaterialModule,
        FlexModule,
        TranslateModule,
        RouterModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

        // provider used to create fake backend
        fakeBackendProvider
    ],
    exports: [
        ProfileComponent
    ]
})
export class AuthModule {
}
