import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {User} from '@app/store/models/user.model';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Router} from '@angular/router';
import {DeleteConfirmDialogComponent} from '@app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {merge} from 'rxjs';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['username', 'email', 'firstName', 'lastName', 'action'];
    searchForm: FormGroup;

    data: User[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    constructor(
        private formBuilder: FormBuilder,
        // private userService: UserService,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            filter: ['', Validators.maxLength(20)]
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

    loadUsers() {
        // this.cityService.loadCities({
        //     sort: this.sort.active,
        //     order: this.sort.direction,
        //     page: this.paginator.pageIndex,
        //     filter: this.searchForm.value.filter
        // });
    }

    // TODO - Test it
    deleteUser(id: number): void {
        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // this.userService.delete(id).subscribe((response) => {
                //     console.log(response);
                // }, error1 => {
                //     console.log(error1);
                // });
            }
        });
    }

}
