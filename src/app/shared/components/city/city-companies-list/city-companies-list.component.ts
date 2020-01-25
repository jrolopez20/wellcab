import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {CityCompany} from '@app/store/models/city-company.model';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeleteConfirmDialogComponent} from '@app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import {City} from '@app/store/models/city.model';
import {CityCompanyService} from '@app/store/features/city-company/city-company.service';

@Component({
    selector: 'app-city-companies-list',
    templateUrl: './city-companies-list.component.html',
    styleUrls: ['./city-companies-list.component.css']
})
export class CityCompaniesListComponent implements OnInit, AfterViewInit {
    @Input() city: City;
    public cityCompanyList$: Observable<CityCompany[]>;
    public cityCompaniesTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    displayedColumns: string[] = ['company', 'postalCode', 'address', 'active', 'action'];
    searchForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private cityCompanyService: CityCompanyService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            filter: ['', Validators.maxLength(20)]
        });

        this.isLoading$ = this.cityCompanyService.getIsLoading$();
        this.cityCompanyList$ = this.cityCompanyService.geCityCompaniesList$();
        this.cityCompaniesTotal$ = this.cityCompanyService.getCityCompaniesTotal$();
        this.error$ = this.cityCompanyService.getError$();

        this.loadCityCompanies();
    }

    ngAfterViewInit() {
        // If the license changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadCityCompanies();
        });
    }

    loadCityCompanies() {
        this.cityCompanyService.loadCompaniesByCity({
            city: this.city,
            sort: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex,
            filter: this.searchForm.value.filter
        });
    }

    // TODO - Test it
    deleteLicense(cityCompany: CityCompany): void {
        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // this.cityCompanyService.deleteCityCompany(cityCompany);
            }
        });
    }
}
