import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {Company} from '@app/store/models/company.model';
import {MatPaginator, MatSort} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {CompanyService} from '@app/store/features/company/company.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit, AfterViewInit {
    @Input() editable = true;
    @Input() selectable = false;
    @Output() onRowSelected = new EventEmitter<Company>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public companyList$: Observable<Company[]>;
    public companiesTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    public initialPageSize = 25;
    public displayedColumns: string[] = ['name', 'cif'];

    private filter: string;
    private selection = new SelectionModel<Company>(false, []);

    constructor(
        private formBuilder: FormBuilder,
        private companyService: CompanyService
    ) {
    }

    ngOnInit() {
        if (this.editable) {
            this.displayedColumns.push('action');
        }
        if (this.selectable) {
            this.displayedColumns.unshift('select');
        }

        this.companyList$ = this.companyService.getCompaniesList$();
        this.companiesTotal$ = this.companyService.getCompaniesTotal$();
        this.isLoading$ = this.companyService.getIsLoading$();
        this.error$ = this.companyService.getError$();

        this.selection.changed.subscribe(value => {
            this.onRowSelected.emit(value.source.selected.shift());
        });
        this.loadCompanies();
    }

    search(filter: string) {
        this.filter = filter;
        this.loadCompanies();
    }

    loadCompanies() {
        this.selection.clear();
        this.companyService.loadCompanies({
            sort: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex + 1,
            limit: this.paginator.pageSize || this.initialPageSize,
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

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Company): string {
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
    }

}
