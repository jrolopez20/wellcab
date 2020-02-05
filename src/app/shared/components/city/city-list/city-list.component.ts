import {Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {City} from '@app/store/models/city.model';
import {FormBuilder} from '@angular/forms';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {CityService} from '@app/store/features/city/city.service';
import {Router} from '@angular/router';
import {Company} from '@app/store/models/company.model';

@Component({
    selector: 'app-city-list',
    templateUrl: './city-list.component.html',
})
export class CityListComponent implements OnInit, AfterViewInit {
    @Input() editable = true;
    @Input() selectable = false;
    @Output() onRowSelected = new EventEmitter<Company>();

    public cityList$: Observable<City[]>;
    public citiesTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    private filter: string;
    private initialPageSize = 25;
    displayedColumns: string[] = ['name', 'action'];

    constructor(
        private formBuilder: FormBuilder,
        private cityService: CityService,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.cityService.getIsLoading$();
        this.cityList$ = this.cityService.getCitiesList$();
        this.citiesTotal$ = this.cityService.getCitiesTotal$();
        this.error$ = this.cityService.getError$();

        this.loadCities();
    }

    search(filter: string) {
        this.filter = filter;
        this.loadCities();
    }

    loadCities() {
        this.cityService.loadCities({
            sort: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex,
            limit: this.paginator.pageSize || this.initialPageSize,
            filter: this.filter
        });
    }

    ngAfterViewInit() {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadCities();
        });
    }

}
