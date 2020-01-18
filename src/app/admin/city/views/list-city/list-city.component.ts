import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {City} from '../../../../store/models/city.model';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Router} from '@angular/router';
import {CityService} from '../../services/city.service';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {DeleteConfirmDialogComponent} from '../../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
    selector: 'app-list-city',
    templateUrl: './list-city.component.html',
    styleUrls: ['./list-city.component.css']
})
export class ListCityComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['name', 'action'];
    data: City[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    constructor(
        private cityService: CityService,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
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
                    return this.cityService.getCollection(
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
                    return observableOf([]);
                })
            ).subscribe(data => this.data = data);
    }

    // TODO - Test it
    deleteCity(id: number): void {
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
