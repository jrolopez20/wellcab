import {Component, OnInit} from '@angular/core';
import {User} from '@app/store/models/user.model';
import {AuthService} from '@app/store/features/auth/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public user: User;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.getAuthenticatedUser$().subscribe(user => {
            this.user = user;
        });
    }

    handleSubmit(user: User) {
        // this.userService.setUser(user);
    }
}
