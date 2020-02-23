import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {Status, Vehicle} from '@app/store/models/vehicle.model';
import {MatPaginator, MatSort} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {VehicleService} from '@app/store/features/vehicle/vehicle.service';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
    selector: 'app-vehicle-list',
    templateUrl: './vehicle-list.component.html',
    styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit, AfterViewInit {
    @Input() editable = true;
    @Input() selectable = false;
    @Input() status: Status;
    @Output() onRowSelected = new EventEmitter<Vehicle>();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public vehicleList$: Observable<Vehicle[]>;
    public vehiclesTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    public initialPageSize = 25;
    public displayedColumns: string[] = ['plateNumber', 'name', 'brand', 'model', 'ownerCompany'];

    private filter: string;
    private selection = new SelectionModel<Vehicle>(false, []);

    constructor(
        private formBuilder: FormBuilder,
        private vehicleService: VehicleService,
    ) {
    }

    ngOnInit() {
        if (this.editable) {
            this.displayedColumns.push('active');
            this.displayedColumns.push('action');
        }
        if (this.selectable) {
            this.displayedColumns.unshift('select');
        }
        this.isLoading$ = this.vehicleService.getIsLoading$();
        this.vehicleList$ = this.vehicleService.getVehiclesList$();
        this.vehiclesTotal$ = this.vehicleService.getVehiclesTotal$();
        this.error$ = this.vehicleService.getError$();

        this.selection.changed.subscribe(value => {
            this.onRowSelected.emit(value.source.selected.shift());
        });
        this.loadVehicles();
    }

    ngAfterViewInit() {
        // If the vehicle changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadVehicles();
        });
    }

    search(filter: string) {
        this.filter = filter;
        this.loadVehicles();
    }

    loadVehicles() {
        this.selection.clear();
        this.vehicleService.loadVehicles({
            status: this.status,
            sort: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex + 1,
            limit: this.paginator.pageSize || this.initialPageSize,
            filter: this.filter
        });
    }

    getOwnerName(owner) {
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
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Vehicle): string {
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
    }
}
