import {Component, Inject, OnInit} from '@angular/core';
import {Role, User} from '@app/store/models/user.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserService} from '@app/store/features/user/user.service';

@Component({
    selector: 'app-user-list-dialog',
    templateUrl: './user-list-dialog.component.html',
    styleUrls: ['./user-list-dialog.component.css']
})
export class UserListDialogComponent implements OnInit {
    public selectedItem: User;

    constructor(
        public dialogRef: MatDialogRef<UserListDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string, roles: Role[] },
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.userService.resetStorage();
    }

    handleSelection(item: User) {
        this.selectedItem = item;
    }

    acept() {
        this.dialogRef.close(this.selectedItem);
    }

}
