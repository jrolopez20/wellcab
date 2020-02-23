import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {License} from '@app/store/models/license.model';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {merge, Observable} from 'rxjs';
import {VehicleAssigment} from '@app/store/models/vehicle-assigment.model';
import {VehicleAssigmentService} from '@app/store/features/vehicle-assigment/vehicle-assigment.service';
import {ConfirmDialogComponent} from '@app/shared/utils/delete-confirm-dialog/confirm-dialog.component';
import {VehicleAssigmentFormComponent} from '@app/shared/components/vehicle-assigment/vehicle-assigment-form/vehicle-assigment-form.component';

@Component({
    selector: 'app-vehicle-assigment-list',
    templateUrl: './vehicle-assigment-list.component.html',
    styleUrls: ['./vehicle-assigment-list.component.css']
})
export class VehicleAssigmentListComponent implements OnInit, AfterViewInit {
    @Input() license: License;
    @Input() editable = true;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public vehicleAssigmentList$: Observable<VehicleAssigment[]>;
    public vehicleAssigmentsTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    public initialPageSize = 25;
    public displayedColumns: string[] = ['plateNumber', 'brand', 'model', 'finishedAt', 'action'];

    private filter: string;

    constructor(
        private vehicleAssigmentService: VehicleAssigmentService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.vehicleAssigmentService.getIsLoading$();
        this.vehicleAssigmentList$ = this.vehicleAssigmentService.getVehicleAssigmentsList$();
        this.vehicleAssigmentsTotal$ = this.vehicleAssigmentService.getVehicleAssigmentsTotal$();
        this.error$ = this.vehicleAssigmentService.getError$();

        this.loadVehicleAssigments();
    }

    ngAfterViewInit() {
        // If the brand changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadVehicleAssigments();
        });
    }

    loadVehicleAssigments() {
        if (this.license) {
            this.vehicleAssigmentService.loadVehicleAssigments({
                licenseId: this.license.id,
                sort: this.sort.active,
                order: this.sort.direction,
                page: this.paginator.pageIndex + 1,
                limit: this.paginator.pageSize || this.initialPageSize,
                filter: this.filter
            });
        }
    }

    showDialog(vehicleAssigment?: VehicleAssigment) {
        const dialogRef = this.dialog.open(VehicleAssigmentFormComponent, {
            minWidth: '400px',
            data: {
                title: vehicleAssigment ? 'Vehicle.Label.VehicleDetail' : 'Vehicle.Label.LinkVehicle',
                licenseId: this.license.id,
                vehicleAssigment
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result && !vehicleAssigment) {
                // Load all vehicle assigments only if it's a new vehicle assigment
                this.loadVehicleAssigments();
            }
        });
    }

    unlink(vehicleAssigment: VehicleAssigment) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                message: 'Common.Confirm.ShureToUnAttach'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.vehicleAssigmentService.unlinkVehicle(this.license.id);
            }
        });
    }

}
