import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DriverAssigment} from '@app/store/models/driver-assigment.model';
import {DriverAssigmentService} from '@app/store/features/driver-assigment/driver-assigment.service';
import {UserListDialogComponent} from '@app/shared/components/user/user-list-dialog/user-list-dialog.component';
import {Role, User} from '@app/store/models/user.model';

@Component({
    selector: 'app-driver-assigment-form',
    templateUrl: './driver-assigment-form.component.html',
    styleUrls: ['./driver-assigment-form.component.css']
})
export class DriverAssigmentFormComponent implements OnInit {
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    public driverAssigmentForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<DriverAssigmentFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string, licenseId: number, driverAssigment?: DriverAssigment },
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private driverAssigmentService: DriverAssigmentService
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.driverAssigmentService.getIsLoading$();
        this.error$ = this.driverAssigmentService.getError$();
        this.initDriverAssigmentForm();
    }

    initDriverAssigmentForm() {
        this.driverAssigmentForm = this.formBuilder.group({
            driverUser: [{
                value: '',
                disabled: this.data.driverAssigment ? this.data.driverAssigment.endAt : false
            }, Validators.required]
        });
        if (this.data.driverAssigment) {
            this.driverAssigmentForm.patchValue(this.data.driverAssigment);
        }
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.driverAssigmentForm.controls;
    }

    /* Get errors */
    public handleError(controlName: string, errorName: string) {
        return this.f[controlName].hasError(errorName);
    }

    submit(): void {
        if (this.driverAssigmentForm.valid) {
            const driverAssigment = this.driverAssigmentForm.getRawValue();
            if (this.data.driverAssigment) {
                driverAssigment.id = this.data.driverAssigment.id;
                this.driverAssigmentService.setDriverAssigment(this.data.licenseId, driverAssigment);
            } else {
                this.driverAssigmentService.addDriverAssigment(this.data.licenseId, driverAssigment.driverUser);
            }
            this.isLoading$.subscribe(loading => {
                if (!loading) {
                    this.dialogRef.close(driverAssigment);
                }
            });
        }
    }

    showDriverUserListDialog() {
        const dialogRef = this.dialog.open(UserListDialogComponent, {
            minWidth: '700px',
            data: {
                roles: [Role.DRIVER]
            }
        });
        dialogRef.afterClosed().subscribe((result: User) => {
            if (result && this.driverAssigmentForm.get('driverUser').value.id !== result.id) {
                this.driverAssigmentForm.get('driverUser').setValue(result);
            }
        });
    }

    driverToString(): string {
        const driver = this.driverAssigmentForm.get('driverUser').value;
        let displayName = null;
        if (driver) {
            if (driver.detail) {
                displayName = driver.detail.name + ' ' + driver.detail.lastName;
            } else {
                displayName = driver.username;
            }
        }
        return displayName;
    }

}
