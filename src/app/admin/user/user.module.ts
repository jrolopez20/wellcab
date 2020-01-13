import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {ListUserComponent} from './components/list-user/list-user.component';
import {AppMaterialModule} from '../../app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {UserService} from './services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';

@NgModule({
    declarations: [EditUserComponent, AddUserComponent, ListUserComponent],
    imports: [
        CommonModule,
        FlexModule,
        AppMaterialModule,
        UserRoutingModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers:[
        UserService
    ]
})
export class UserModule {
}
