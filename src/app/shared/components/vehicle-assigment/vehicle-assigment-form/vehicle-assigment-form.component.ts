import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {VehicleAssigment} from '@app/store/models/vehicle-assigment.model';
import {VehicleAssigmentService} from '@app/store/features/vehicle-assigment/vehicle-assigment.service';
import {Status, Vehicle} from '@app/store/models/vehicle.model';
import {VehicleListDialogComponent} from '@app/shared/components/vehicle/vehicle-list-dialog/vehicle-list-dialog.component';


@Component({
    selector: 'app-vehicle-assigment-form',
    templateUrl: './vehicle-assigment-form.component.html',
    styleUrls: ['./vehicle-assigment-form.component.css']
})
export class VehicleAssigmentFormComponent implements OnInit {
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    public vehicleAssigmentForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<VehicleAssigmentFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string, licenseId: number, vehicleAssigment?: VehicleAssigment },
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private vehicleAssigmentService: VehicleAssigmentService
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.vehicleAssigmentService.getIsLoading$();
        this.error$ = this.vehicleAssigmentService.getError$();
        this.initVehicleAssigmentForm();
    }

    initVehicleAssigmentForm() {
        this.vehicleAssigmentForm = this.formBuilder.group({
            vehicle: [{
                value: '',
                disabled: this.data.vehicleAssigment ? this.data.vehicleAssigment.finishedAt : false
            }, Validators.required]
        });
        if (this.data.vehicleAssigment) {
            this.vehicleAssigmentForm.patchValue(this.data.vehicleAssigment);
        }
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.vehicleAssigmentForm.controls;
    }

    /* Get errors */
    public handleError(controlName: string, errorName: string) {
        return this.f[controlName].hasError(errorName);
    }

    submit(): void {
        if (this.vehicleAssigmentForm.valid) {
            const vehicle = this.vehicleAssigmentForm.get('vehicle').value;
            if (this.data.vehicleAssigment) {
                this.vehicleAssigmentService.setVehicleAssigment(this.data.licenseId, vehicle);
            } else {
                this.vehicleAssigmentService.addVehicleAssigment(this.data.licenseId, vehicle);
            }
            this.isLoading$.subscribe(loading => {
                if (!loading) {
                    this.dialogRef.close(vehicle);
                }
            });
        }
    }

    showVehicleListDialog() {
        const dialogRef = this.dialog.open(VehicleListDialogComponent, {
            minWidth: '700px',
            data: {
                status: [Status.OPERATIVE]
            }
        });
        dialogRef.afterClosed().subscribe((result: Vehicle) => {
            if (result && this.vehicleAssigmentForm.get('vehicle').value.id !== result.id) {
                this.vehicleAssigmentForm.get('vehicle').setValue(result);
            }
        });
    }

    vehicleToString(): string {
        const vehicle = this.vehicleAssigmentForm.get('vehicle').value;
        return vehicle ? vehicle.plateNumber : null;
    };

}
