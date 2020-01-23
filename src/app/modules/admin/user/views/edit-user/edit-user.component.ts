import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CityService} from '@app/store/features/city/city.service';
import {User} from '@app/store/models/user.model';
import {UserService} from '@app/store/features/user/user.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
    userId = null;
    public user: User;

    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private userService: UserService
    ) {
        this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.loadUserData(this.userId);
    }

    loadUserData(id) {
        this.userService.getUsersList$().subscribe(users => {
            if (users) {
                this.user = users.find(user => user.id.toString() === id);
                if (!this.user) {
                    this.router.navigate(['admin/users']);
                }
            } else {
                this.router.navigate(['admin/users']);
            }
        });
    }

    handleSubmit(user: User) {
        // this.userService.setUser(user);
    }

}
