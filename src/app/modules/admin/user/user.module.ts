import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {EditUserComponent} from './views/edit-user/edit-user.component';
import {AddUserComponent} from './views/add-user/add-user.component';
import {ListUserComponent} from './views/list-user/list-user.component';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import {StoreModule} from '@ngrx/store';
import * as fromUserStore from '@app/store/features/user/user.reducer';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from '@app/store/features/user/user.effects';

@NgModule({
    declarations: [EditUserComponent, AddUserComponent, ListUserComponent, UserListComponent, UserFormComponent],
    imports: [
        CommonModule,
        FlexModule,
        AppMaterialModule,
        UserRoutingModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forFeature(
            fromUserStore.featureKey,
            fromUserStore.reducer
        ),
        EffectsModule.forFeature([UserEffects])
    ],
    providers: [
    ]
})
export class UserModule {
}
