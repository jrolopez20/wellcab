import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Router} from '@angular/router';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {DeleteConfirmDialogComponent} from '../../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import {Company} from '../../models/company.model';
import {CompanyService} from '../../services/company.service';

@Component({
    selector: 'app-list-company',
    templateUrl: './list-company.component.html',
    styleUrls: ['./list-company.component.css']
})
export class ListCompanyComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['name', 'address', 'action'];
    data: Company[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    constructor(
        private companyService: CompanyService,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    ngAfterViewInit() {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    // return this.exampleDatabase!.getRepoIssues(
                    //     this.sort.active, this.sort.direction, this.paginator.pageIndex);
                    return this.companyService.getCollection(
                        this.sort.active, this.sort.direction, this.paginator.pageIndex);
                }),
                map(data => {
                    // Flip flag to show that loading has finished.
                    this.isLoadingResults = false;
                    this.isRateLimitReached = false;
                    this.resultsLength = data.total;

                    return data.items;
                }),
                catchError((err) => {
                    this.isLoadingResults = false;
                    this.isRateLimitReached = true;
                    console.log(err);
                    return observableOf([]);
                })
            ).subscribe(data => this.data = data);
    }

    ngOnInit() {
    }

    editUser(id: number): void {
        this.router.navigate([`/users/${id}`]);
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
