import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {License} from '@app/store/models/license.model';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {merge, Observable} from 'rxjs';
import {ConfirmDialogComponent} from '@app/shared/utils/delete-confirm-dialog/confirm-dialog.component';
import {DriverAssigmentService} from '@app/store/features/driver-assigment/driver-assigment.service';
import {DriverAssigment} from '@app/store/models/driver-assigment.model';
import {DriverAssigmentFormComponent} from '@app/shared/components/driver-assigment/driver-assigment-form/driver-assigment-form.component';

@Component({
    selector: 'app-driver-assigment-list',
    templateUrl: './driver-assigment-list.component.html',
    styleUrls: ['./driver-assigment-list.component.css']
})
export class DriverAssigmentListComponent implements OnInit, AfterViewInit {
    @Input() license: License;
    @Input() editable = true;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public driverAssigmentList$: Observable<DriverAssigment[]>;
    public driverAssigmentsTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    private filter: string;
    private initialPageSize = 25;
    private displayedColumns: string[] = ['username', 'name', 'lastName', 'endAt', 'action'];

    constructor(
        private driverAssigmentService: DriverAssigmentService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.driverAssigmentService.getIsLoading$();
        this.driverAssigmentList$ = this.driverAssigmentService.getDriverAssigmentsList$();
        this.driverAssigmentsTotal$ = this.driverAssigmentService.getDriverAssigmentsTotal$();
        this.error$ = this.driverAssigmentService.getError$();

        this.loadDriverAssigments();
    }

    ngAfterViewInit() {
        // If the brand changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadDriverAssigments();
        });
    }

    loadDriverAssigments() {
        if (this.license) {
            this.driverAssigmentService.loadDriverAssigments({
                licenseId: this.license.id,
                sort: this.sort.active,
                order: this.sort.direction,
                page: this.paginator.pageIndex + 1,
                limit: this.paginator.pageSize || this.initialPageSize,
                filter: this.filter
            });
        }
    }

    showDialog(driverAssigment?: DriverAssigment) {
        const dialogRef = this.dialog.open(DriverAssigmentFormComponent, {
            minWidth: '400px',
            data: {
                title: driverAssigment ? 'Driver.Label.DriverDetail' : 'Driver.Label.LinkDriver',
                licenseId: this.license.id,
                driverAssigment
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result && !driverAssigment) {
                // Load all driver assigments only if it's a new driver assigment
                this.loadDriverAssigments();
            }
        });
    }

    unlink(driverAssigment: DriverAssigment) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                message: 'Common.Confirm.ShureToUnAttach'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.driverAssigmentService.unlinkDriver(this.license.id, driverAssigment);
            }
        });
    }
}
