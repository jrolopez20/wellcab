import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Router} from '@angular/router';
import {DeleteConfirmDialogComponent} from '@app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {merge, Observable} from 'rxjs';
import {UserService} from '@app/store/features/user/user.service';
import {User} from '@app/store/models/user.model';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
    public userList$: Observable<User[]>;
    public usersTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    displayedColumns: string[] = ['name', 'lastName', 'username', 'email', 'hasAccess', 'active', 'action'];
    searchForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            filter: ['', Validators.maxLength(20)]
        });

        this.isLoading$ = this.userService.getIsLoading$();
        this.userList$ = this.userService.getUsersList$();
        this.usersTotal$ = this.userService.getUsersTotal$();
        this.error$ = this.userService.getError$();

        this.loadUsers();
    }

    ngAfterViewInit() {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadUsers();
        });
    }

    loadUsers() {
        this.userService.loadUsers({
            sort: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex,
            filter: this.searchForm.value.filter
        });
    }

    updateUser($event, user: User) {
        const copy = {...user, hasAccess: $event.checked};
        this.userService.setUser(copy);
    }

    // TODO - Test it
    deleteUser(user: User): void {
        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // this.userService.deleteUser(user).subscribe((response) => {
                //     console.log(response);
                // }, error1 => {
                //     console.log(error1);
                // });
            }
        });
    }

}
