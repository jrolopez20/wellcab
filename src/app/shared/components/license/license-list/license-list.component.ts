import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {License} from '@app/store/models/license.model';
import {merge, Observable} from 'rxjs';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LicenseService} from '@app/store/features/license/license.service';
import {Router} from '@angular/router';
import {ConfirmDialogComponent} from '@app/shared/utils/delete-confirm-dialog/confirm-dialog.component';
import {Contract} from '@app/store/models/contract.model';
import {CompanyListDialogComponent} from '@app/shared/components/company/company-list-dialog/company-list-dialog.component';
import {Company} from '@app/store/models/company.model';
import {ContractFormComponent} from '@app/shared/components/contract/contract-form/contract-form.component';
import {ContractService} from '@app/store/features/contract/contract.service';

@Component({
    selector: 'app-license-list',
    templateUrl: './license-list.component.html',
    styleUrls: ['./license-list.component.css']
})
export class LicenseListComponent implements OnInit, AfterViewInit {
    @Input() editable = true;
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
        public dialog: MatDialog
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

    showContractDialog(license: License) {
        const dialogRef = this.dialog.open(ContractFormComponent, {
            minWidth: '400px',
            data: {
                title: license.contract ? 'Contract.Label.ContractDetail' : 'Contract.Label.AddContract',
                licenseId: license.id,
                contract: license.contract
            }
        });
        dialogRef.afterClosed().subscribe((result: Contract) => {
            if (result) {
                this.loadLicenses();
            }
        });
    }

    closeContract(license: License) {
        if (license.contract) {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: {
                    message: 'Contract.Label.ShureToCloseContract'
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.contractService.closeContract(license.id);
                    this.isLoadingContract$.subscribe(loading => {
                        if (!loading) {
                            this.loadLicenses();
                        }
                    });
                }
            });
        }
    }

}
