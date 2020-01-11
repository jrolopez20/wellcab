import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddUserComponent} from './components/add-user/add-user.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {ListUserComponent} from './components/list-user/list-user.component';


const routes: Routes = [
    {
        path: '', component: ListUserComponent
    },
    {
        path: 'add',
        component: AddUserComponent
    },
    {
        path: ':id',
        component: EditUserComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
