import {Component, OnInit} from '@angular/core';
import {User} from '@app/store/models/user.model';
import {UserService} from '@app/store/features/user/user.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

    handleSubmit(user: User) {
        this.userService.addUser(user);
    }

}
