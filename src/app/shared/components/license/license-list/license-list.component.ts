import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {License} from '@app/store/models/license.model';
import {merge, Observable} from 'rxjs';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LicenseService} from '@app/store/features/license/license.service';
import {Router} from '@angular/router';
import {DeleteConfirmDialogComponent} from '@app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
    selector: 'app-license-list',
    templateUrl: './license-list.component.html',
    styleUrls: ['./license-list.component.css']
})
export class LicenseListComponent implements OnInit, AfterViewInit {
    public licenseList$: Observable<License[]>;
    public licensesTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    displayedColumns: string[] = ['code', 'issuesAt', 'expirationAt', 'isOperative', 'active', 'action'];
    searchForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private licenseService: LicenseService,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            filter: ['', Validators.maxLength(20)]
        });

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

    loadLicenses() {
        this.licenseService.loadLicenses({
            sort: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex,
            filter: this.searchForm.value.filter
        });
    }

    updateLicense($event, license: License) {
        const copy = {...license, hasAccess: $event.checked};
        this.licenseService.setLicense(copy);
    }

    // TODO - Test it
    deleteLicense(license: License): void {
        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // this.licenseService.deleteLicense(license).subscribe((response) => {
                //     console.log(response);
                // }, error1 => {
                //     console.log(error1);
                // });
            }
        });
    }

}
