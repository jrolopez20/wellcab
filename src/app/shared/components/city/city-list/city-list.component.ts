import {Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {City} from '@app/store/models/city.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {CityService} from '@app/store/features/city/city.service';
import {Router} from '@angular/router';
import {DeleteConfirmDialogComponent} from '@app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
    selector: 'app-city-list',
    templateUrl: './city-list.component.html',
})
export class CityListComponent implements OnInit, AfterViewInit {
    public cityList$: Observable<City[]>;
    public citiesTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    displayedColumns: string[] = ['name', 'action'];
    searchForm: FormGroup;

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

        this.isLoading$ = this.cityService.getIsLoading$();
        this.cityList$ = this.cityService.getCitiesList$();
        this.citiesTotal$ = this.cityService.getCitiesTotal$();
        this.error$ = this.cityService.getError$();

        this.loadCities();
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
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadCities();
        });
    }

    deleteCity(city: City): void {
        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.cityService.deleteCity(city);
            }
        });
    }

}
