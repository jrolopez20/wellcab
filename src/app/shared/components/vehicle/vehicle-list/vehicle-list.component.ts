import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {Vehicle} from '@app/store/models/vehicle.model';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VehicleService} from '@app/store/features/vehicle/vehicle.service';
import {Router} from '@angular/router';
import {DeleteConfirmDialogComponent} from '@app/shared/utils/delete-confirm-dialog/delete-confirm-dialog.component';


@Component({
    selector: 'app-vehicle-list',
    templateUrl: './vehicle-list.component.html',
    styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit, AfterViewInit {
    public vehicleList$: Observable<Vehicle[]>;
    public vehiclesTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    private initialPageSize = 25;
    displayedColumns: string[] = ['plateNumber', 'name', 'brand', 'model', 'ownerCompany', 'active', 'action'];
    searchForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private vehicleService: VehicleService,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            filter: ['', Validators.maxLength(20)]
        });

        this.isLoading$ = this.vehicleService.getIsLoading$();
        this.vehicleList$ = this.vehicleService.getVehiclesList$();
        this.vehiclesTotal$ = this.vehicleService.getVehiclesTotal$();
        this.error$ = this.vehicleService.getError$();

        this.loadVehicles();
    }

    ngAfterViewInit() {
        // If the vehicle changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadVehicles();
        });
    }

    loadVehicles() {
        this.vehicleService.loadVehicles({
            sort: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex,
            limit: this.paginator.pageSize || this.initialPageSize,
            filter: this.searchForm.value.filter
        });
    }

    private getOwnerName = (owner) => {

        let displayName = null;
        if (owner) {
            // Check if owner is a user
            if (owner.ownerType === 'user') {
                if (owner.ownerUser.detail) {
                    displayName = owner.ownerUser.detail.name + ' ' + owner.ownerUser.detail.lastName;
                } else {
                    displayName = owner.ownerUser.username;
                }
            } else {
                // In other case the owner is a company
                displayName = owner.ownerCompany.name;
            }

        }
        return displayName;
    };

    // TODO - Test it
    deleteVehicle(vehicle: Vehicle): void {
        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // this.vehicleService.deleteVehicle(vehicle).subscribe((response) => {
                //     console.log(response);
                // }, error1 => {
                //     console.log(error1);
                // });
            }
        });
    }

}
