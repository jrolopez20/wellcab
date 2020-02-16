import {AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {License} from '@app/store/models/license.model';
import {merge, Observable} from 'rxjs';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {LicenseService} from '@app/store/features/license/license.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-license-list',
    templateUrl: './license-list.component.html',
    styleUrls: ['./license-list.component.css']
})
export class LicenseListComponent implements OnInit, AfterViewInit {
    @Input() editable = true;
    @Input() showExtraAction = false;
    @Input() actionButtons: TemplateRef<any>;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public licenseList$: Observable<License[]>;
    public licensesTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    private initialPageSize = 25;
    private displayedColumns: string[] = ['code', 'issuesAt', 'expirationAt', 'isOperative', 'active', 'action'];
    private filter: string;

    constructor(
        private formBuilder: FormBuilder,
        private licenseService: LicenseService,
        private router: Router,
        private _route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.licenseService.getIsLoading$();
        this.licenseList$ = this.licenseService.getLicensesList$();
        this.licensesTotal$ = this.licenseService.getLicensesTotal$();
        this.error$ = this.licenseService.getError$();
        this.loadLicenses();
    }

    ngAfterViewInit() {
        // If the license changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadLicenses();
        });
    }

    search(filter: string) {
        this.filter = filter;
        this.loadLicenses();
    }

    loadLicenses() {
        this.licenseService.loadLicenses({
            sort: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex,
            limit: this.paginator.pageSize || this.initialPageSize,
            filter: this.filter
        });
    }

    editLicense(license: License) {
        this.licenseService.setCurrentLicense(license);
        this.router.navigate([license.id], {relativeTo: this._route});
    }

}
