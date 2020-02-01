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
import {UtilsModule} from '@app/shared/utils/utils.module';
import {UserListDialogComponent} from './user-list-dialog/user-list-dialog.component';


@NgModule({
    declarations: [UserFormComponent, UserListComponent, UserListDialogComponent],
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
        EffectsModule.forFeature([UserEffects]),
        UtilsModule
    ],
    exports: [UserFormComponent, UserListComponent],
    entryComponents: [UserListDialogComponent]
})
export class UserModule {
}
