import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {Company} from '@app/store/models/company.model';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '@app/store/features/company/company.service';
import {Router} from '@angular/router';
import {DeleteConfirmDialogComponent} from '@app/shared/utils/delete-confirm-dialog/delete-confirm-dialog.component';
import {SelectionModel} from '@angular/cdk/collections';
import {Brand} from '@app/store/models/brand.model';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit, AfterViewInit {
    @Input() editable = true;
    @Input() selectable = false;
    @Output() onRowSelected = new EventEmitter<Company>();

    public companyList$: Observable<Company[]>;
    public companiesTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    private filter: string;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    displayedColumns: string[] = ['name'];

    private selection = new SelectionModel<Brand>(false, []);

    constructor(
        private formBuilder: FormBuilder,
        private companyService: CompanyService,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        if (this.editable) {
            this.displayedColumns.push('action');
        }
        if (this.selectable) {
            this.displayedColumns.unshift('select');
        }

        this.isLoading$ = this.companyService.getIsLoading$();
        this.companyList$ = this.companyService.getCompaniesList$();
        this.companiesTotal$ = this.companyService.getCompaniesTotal$();
        this.error$ = this.companyService.getError$();

        this.selection.changed.subscribe(value => {
            this.onRowSelected.emit(value.source.selected.shift());
        });

        this.loadCompanies();
    }

    search(filter: string) {
        this.filter = filter;
        console.log(this.filter);
        this.loadCompanies();
    }

    loadCompanies() {
        this.companyService.loadCompanies({
            sort: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex,
            filter: this.filter
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

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Company): string {
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
    }

}
