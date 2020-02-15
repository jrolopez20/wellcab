import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {License} from '@app/store/models/license.model';
import {merge, Observable} from 'rxjs';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LicenseService} from '@app/store/features/license/license.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialogComponent} from '@app/shared/utils/delete-confirm-dialog/confirm-dialog.component';
import {Contract} from '@app/store/models/contract.model';
import {ContractFormComponent} from '@app/shared/components/contract/contract-form/contract-form.component';
import {ContractService} from '@app/store/features/contract/contract.service';

@Component({
    selector: 'app-license-list',
    templateUrl: './license-list.component.html',
    styleUrls: ['./license-list.component.css']
})
export class LicenseListComponent implements OnInit, AfterViewInit {
    @Input() editable = true;
    @Input() showExtraAction = false;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public licenseList$: Observable<License[]>;
    public licensesTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    public isLoadingContract$: Observable<boolean>;

    private initialPageSize = 25;
    private displayedColumns: string[] = ['code', 'issuesAt', 'expirationAt', 'isOperative', 'active', 'action'];
    private filter: string;

    constructor(
        private formBuilder: FormBuilder,
        private licenseService: LicenseService,
        private contractService: ContractService,
        private router: Router,
        public dialog: MatDialog,
        private _route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.licenseService.getIsLoading$();
        this.licenseList$ = this.licenseService.getLicensesList$();
        this.licensesTotal$ = this.licenseService.getLicensesTotal$();
        this.error$ = this.licenseService.getError$();
        this.isLoadingContract$ = this.contractService.getIsLoading$();
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

    showContracts(license: License) {
        this.licenseService.setCurrentLicense(license);
        this.router.navigate([license.id, 'contracts'], {relativeTo: this._route});
    }

    showVehicles(license: License) {
        this.licenseService.setCurrentLicense(license);
        this.router.navigate([license.id, 'vehicles'], {relativeTo: this._route});
    }

    showDrivers(license: License) {
        this.licenseService.setCurrentLicense(license);
        this.router.navigate([license.id, 'drivers'], {relativeTo: this._route});
    }

}
