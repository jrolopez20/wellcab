import {Component, Inject, OnInit} from '@angular/core';
import {Status, Vehicle} from '@app/store/models/vehicle.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {VehicleService} from '@app/store/features/vehicle/vehicle.service';

@Component({
    selector: 'app-vehicle-list-dialog',
    templateUrl: './vehicle-list-dialog.component.html',
    styleUrls: ['./vehicle-list-dialog.component.css']
})
export class VehicleListDialogComponent implements OnInit {
    public selectedItem: Vehicle;

    constructor(
        public dialogRef: MatDialogRef<VehicleListDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { status: Status },
        private vehicleService: VehicleService
    ) {
    }

    ngOnInit() {
        this.vehicleService.resetStorage();
    }

    handleSelection(item: Vehicle) {
        this.selectedItem = item;
    }

    acept() {
        this.dialogRef.close(this.selectedItem);
    }

}
