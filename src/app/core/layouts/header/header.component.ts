import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Lang, User} from '../../../store/models/user.model';
import {UserService} from '../../../admin/user/services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: []
})
export class AppHeaderComponent implements OnInit {
    public user: User;


    constructor(
        public dialog: MatDialog,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.user = this.authenticationService.currentUserValue;
    }

    handleLogout(): void {
        const dialogRef = this.dialog.open(AppLogoutDialogComponent);
    }

    onLangPicked(language: Lang) {
        this.userService.updateProfile(language);
    }
}

@Component({
    selector: 'app-logout-dialog',
    templateUrl: './logout-dialog.html'
})
export class AppLogoutDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<AppLogoutDialogComponent>,
        private authenticationService: AuthenticationService
    ) {
    }

    handleLogout(): void {
        this.authenticationService.logout();
        this.dialogRef.close();
    }
}
