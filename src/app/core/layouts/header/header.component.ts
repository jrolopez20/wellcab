import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Lang, User} from '../../../admin/user/models/user.model';
import {UserService} from '../../../admin/user/services/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: []
})
export class AppHeaderComponent implements OnInit {
    public user: User;
    public langs: Lang[];

    constructor(
        public dialog: MatDialog,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private translateService: TranslateService
    ) {
    }

    ngOnInit() {
        this.langs = [Lang.en, Lang.es];
        this.user = this.authenticationService.currentUserValue;
    }

    handleLogout(): void {
        const dialogRef = this.dialog.open(AppLogoutDialogComponent);
    }

    changeLang(language: Lang): void {
        this.translateService.use(language);
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
