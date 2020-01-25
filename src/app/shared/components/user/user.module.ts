import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserFormComponent} from '@app/shared/components/user/user-form/user-form.component';
import {UserListComponent} from '@app/shared/components/user/user-list/user-list.component';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import * as UserReducer from '@app/store/features/user/user.reducer';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from '@app/store/features/user/user.effects';


@NgModule({
    declarations: [UserFormComponent, UserListComponent],
    imports: [
        CommonModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FlexModule,
        RouterModule,
        StoreModule.forFeature(
            UserReducer.featureKey,
            UserReducer.reducer
        ),
        EffectsModule.forFeature([UserEffects])
    ],
    exports: [UserFormComponent, UserListComponent]
})
export class UserModule {
}
