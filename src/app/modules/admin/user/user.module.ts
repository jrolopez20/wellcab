import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {EditUserComponent} from './views/edit-user/edit-user.component';
import {AddUserComponent} from './views/add-user/add-user.component';
import {ListUserComponent} from './views/list-user/list-user.component';
import {SharedModule} from '@app/shared';

@NgModule({
    declarations: [EditUserComponent, AddUserComponent, ListUserComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule
    ],
    providers: []
})
export class UserModule {
}
