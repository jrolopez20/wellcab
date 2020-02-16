import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '@app/store/models/user.model';
import {UserService} from '@app/store/features/user/user.service';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {
    public user: User;
    private readonly userId: number;
    private subscription: Subscription;

    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private location: Location
    ) {
        this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    }

    ngOnInit() {
        this.loadUserData(this.userId);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    loadUserData(id) {
        this.subscription = this.userService.getCurrentUser$().subscribe(user => {
            if (user) {
                this.user = user;
            } else {
                this.location.back();
            }
        });
    }

}
