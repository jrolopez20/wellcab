import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialogComponent} from '@app/shared/utils/delete-confirm-dialog/confirm-dialog.component';
import {FormBuilder} from '@angular/forms';
import {merge, Observable} from 'rxjs';
import {UserService} from '@app/store/features/user/user.service';
import {Role, User} from '@app/store/models/user.model';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
    @Input() editable = true;
    @Input() selectable = false;
    @Input() roles: Role[];
    @Input() showActiveUsers: boolean;
    @Output() onRowSelected = new EventEmitter<User>();

    public userList$: Observable<User[]>;
    public usersTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    private filter: string;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    private initialPageSize = 25;
    private displayedColumns: string[] = ['username', 'email', 'name', 'lastName'];
    private selection = new SelectionModel<User>(false, []);

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        private _route: ActivatedRoute,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        if (this.editable) {
            this.displayedColumns.push('hasAccess');
            this.displayedColumns.push('active');
            this.displayedColumns.push('action');
        }
        if (this.selectable) {
            this.displayedColumns.unshift('select');
        }
        this.isLoading$ = this.userService.getIsLoading$();
        this.userList$ = this.userService.getUsersList$();
        this.usersTotal$ = this.userService.getUsersTotal$();
        this.error$ = this.userService.getError$();

        this.selection.changed.subscribe(value => {
            this.onRowSelected.emit(value.source.selected.shift());
        });

        this.loadUsers();
    }

    ngAfterViewInit() {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadUsers();
        });
    }

    search(filter: string) {
        this.filter = filter;
        this.loadUsers();
    }

    loadUsers() {
        this.selection.clear();
        this.userService.loadUsers({
            sort: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex + 1,
            limit: this.paginator.pageSize || this.initialPageSize,
            filter: this.filter,
            roles: this.roles,
            active: this.showActiveUsers
        });
    }

    onAccessChange(slider, user: User) {
        const userCopy = {...user, hasAccess: slider.checked};
        if (slider.checked) {
            this.userService.toggleAccess(userCopy);
        } else {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: {
                    message: 'Common.Confirm.ShureToRemoveAccess'
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.userService.toggleAccess(userCopy);
                } else {
                    slider.source.checked = !slider.source.checked;
                }
            });
        }
    }

    editUser(user: User) {
        this.userService.setCurrentUser(user);
        this.router.navigate([user.id], {relativeTo: this._route});
    }

    toggleUnregister(user: User) {
        if (user.unregisteredAt) {
            this.userService.toggleUnregister(user);
        } else {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: {
                    message: 'Common.Confirm.ShureToDeactivate'
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.userService.toggleUnregister(user);
                }
            });
        }
    }
}
