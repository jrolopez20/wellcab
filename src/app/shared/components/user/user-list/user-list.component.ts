import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Router} from '@angular/router';
import {DeleteConfirmDialogComponent} from '@app/shared/utils/delete-confirm-dialog/delete-confirm-dialog.component';
import {FormBuilder} from '@angular/forms';
import {merge, Observable} from 'rxjs';
import {UserService} from '@app/store/features/user/user.service';
import {User} from '@app/store/models/user.model';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
    @Input() editable = true;
    @Input() selectable = false;
    @Output() onRowSelected = new EventEmitter<User>();

    public userList$: Observable<User[]>;
    public usersTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    private filter: string;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    private initialPageSize = 25;
    private displayedColumns: string[] = ['username', 'email', 'name', 'lastName', 'active'];
    private selection = new SelectionModel<User>(false, []);

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        if (this.editable) {
            this.displayedColumns.push('hasAccess');
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
            page: this.paginator.pageIndex,
            limit: this.paginator.pageSize || this.initialPageSize,
            filter: this.filter
        });
    }

    onAccessChange(slider, user: User) {
        if (slider.checked) {
            const userCopy = {...user, hasAccess: slider.checked};
            this.userService.toggleAccess(userCopy);
        } else {
            const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
                data: {
                    message: 'Common.Confirm.ShureToRemoveAccess'
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.userService.toggleUnregister(user);
                } else {
                    slider.source.checked = true;
                }
            });
        }
    }

    toggleUnregister(user: User) {
        if (user.unregisteredAt) {
            this.userService.toggleUnregister(user);
        } else {
            const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
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
