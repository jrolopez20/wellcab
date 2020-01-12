/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {NgModule} from '@angular/core';

import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {Lang} from './admin/user/models/user.model';
import {AuthenticationService} from './auth/services/authentication.service';

export const createTranslateLoader = (http: HttpClient) => {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
};

/**
 * NgModule that includes ngx-translate module required for translations
 */
@NgModule({
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ]
})
export class I18nModule {
    private language = Lang.es;

    constructor(private translateService: TranslateService, private authenticationService: AuthenticationService) {
        if (authenticationService.currentUserValue) {
            this.language = authenticationService.currentUserValue.lang;
        }
        this.translateService.setDefaultLang(this.language);
        this.translateService.use(this.language);
    }
}
