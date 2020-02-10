import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Lang, User} from '../../../store/models/user.model';
import {AuthService} from '@app/store/features/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: []
})
export class AppHeaderComponent implements OnInit {
    @Input() user: User;
    @Output() onChangePassword = new EventEmitter();

    constructor(
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
    }

    handleLogout(): void {
        const dialogRef = this.dialog.open(AppLogoutDialogComponent);
    }

    changePassword() {
        this.onChangePassword.emit();
    }
}

@Component({
    selector: 'app-logout-dialog',
    templateUrl: './logout-dialog.html'
})
export class AppLogoutDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<AppLogoutDialogComponent>,
        private authService: AuthService
    ) {
    }

    handleLogout(): void {
        this.authService.logout();
        this.dialogRef.close();
    }
}
