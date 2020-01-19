import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {City} from '@app/store/models/city.model';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Router} from '@angular/router';
import {merge, Observable, of, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {DeleteConfirmDialogComponent} from '@app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import {CityService} from '@app/store/features/city/city.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-list-city',
    templateUrl: './list-city.component.html',
    styleUrls: ['./list-city.component.css']
})
export class ListCityComponent implements OnInit, AfterViewInit {
    public cityList$: Observable<City[]>;
    public citiesTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    displayedColumns: string[] = ['name', 'action'];
    searchForm: FormGroup;

    isRateLimitReached = false;

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    constructor(
        private formBuilder: FormBuilder,
        private cityService: CityService,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            filter: ['', Validators.maxLength(20)]
        });

        this.cityList$ = this.cityService.getCitiesList$();
        this.citiesTotal$ = this.cityService.getCitiesTotal$();
        this.isLoading$ = this.cityService.getIsLoading$();
        this.error$ = this.cityService.getError$();
    }

    loadCities() {
        this.cityService.loadCities({
            sort: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex,
            filter: this.searchForm.value.filter
        });
    }

    ngAfterViewInit() {
        this.loadCities();

        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadCities();
        });
    }

    // TODO - Incomplete
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
