import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {Company} from '@app/store/models/company.model';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '@app/store/features/company/company.service';
import {Router} from '@angular/router';
import {DeleteConfirmDialogComponent} from '@app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit, AfterViewInit {
    public companyList$: Observable<Company[]>;
    public companiesTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    displayedColumns: string[] = ['name', 'action'];
    searchForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private companyService: CompanyService,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            filter: ['', Validators.maxLength(20)]
        });

        this.isLoading$ = this.companyService.getIsLoading$();
        this.companyList$ = this.companyService.getCompaniesList$();
        this.companiesTotal$ = this.companyService.getCompaniesTotal$();
        this.error$ = this.companyService.getError$();

        this.loadCompanies();
    }

    loadCompanies() {
        this.companyService.loadCompanies({
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
            this.loadCompanies();
        });
    }

    deleteCompany(company: Company): void {
        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.companyService.deleteCompany(company);
            }
        });
    }

}
