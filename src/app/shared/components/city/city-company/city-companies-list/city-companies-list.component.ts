import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {CityCompany} from '@app/store/models/city-company.model';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {City} from '@app/store/models/city.model';
import {CityCompanyService} from '@app/store/features/city-company/city-company.service';
import {CityCompanyFormComponent} from '@app/shared/components/city/city-company/city-company-form/city-company-form.component';
import {Location} from '@angular/common';

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
    private filter: string;
    private initialPageSize = 25;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    displayedColumns: string[] = ['company', 'postalCode', 'address', 'linked', 'action'];

    constructor(
        private formBuilder: FormBuilder,
        private cityCompanyService: CityCompanyService,
        private location: Location,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
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

    search(filter: string) {
        this.filter = filter;
        this.loadCityCompanies();
    }

    loadCityCompanies() {
        this.cityCompanyService.loadCompaniesByCity({
            cityId: this.city.id,
            sort: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex,
            limit: this.paginator.pageSize || this.initialPageSize,
            filter: this.filter
        });
    }

    showDialog(cityCompany?: CityCompany) {
        const dialogRef = this.dialog.open(CityCompanyFormComponent, {
            minWidth: '340px',
            data: {
                title: cityCompany ? 'City.Label.CompanyDetail' : 'City.Label.AttachCompany',
                cityId: this.city.id,
                cityCompany
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (!cityCompany) {
                // Load all city companies only if a new cityCompany is added
                this.loadCityCompanies();
            }
        });
    }

    toggleLinkCityCompany(cityCompany: CityCompany): void {
        this.cityCompanyService.toggleLinkCityCompany(this.city.id, cityCompany);

        /*const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
            data: {
                message: 'Common.Confirm.ShureToUnAttach'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.cityCompanyService.toggleLinkCityCompany(this.city.id, cityCompany);
            }
        });*/
    }
}
