import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Role, User} from '@app/store/models/user.model';
import {UserService} from '@app/store/features/user/user.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    @Input() title: string;
    @Input() subtitle: string;
    @Input() user: User;
    @Input() hideRole: boolean;
    @Output() onSubmit = new EventEmitter<User>();

    userForm: FormGroup;
    detailFormGroup: FormGroup;
    driverDetailFormGroup: FormGroup;
    loading = false;
    error: '';
    private roles: Role[];
    removable = true;

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private snackBar: MatSnackBar,
        private userService: UserService,
        private location: Location
    ) {
        this.roles = this.userService.getRolesAvailable();
    }

    ngOnInit() {
        this.initUserForm();
    }

    initUserForm() {
        this.driverDetailFormGroup = this.formBuilder.group({
            socialSecurityNumber: ['']
        });

        this.detailFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            lastName: ['', Validators.required],
            documentType: ['', Validators.required],
            identificationDocument: ['', Validators.required],
            address: [''],
            mainContactPhone: ['', Validators.required],
            secondaryContactPhone: [''],
            bankAccountNumber: [''],
            driver: this.driverDetailFormGroup
        });

        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: new FormControl('', Validators.compose([
                Validators.required, Validators.email
            ])),
            roles: ['', Validators.required],
            detail: this.detailFormGroup
        });

        if (this.user) {
            this.userForm.patchValue(this.user);
        }
    }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        if (this.userForm.contains(controlName)) {
            return this.userForm.controls[controlName].hasError(errorName);
        } else if (this.detailFormGroup.contains(controlName)) {
            return this.detailFormGroup.controls[controlName].hasError(errorName);
        } else if (this.driverDetailFormGroup.contains(controlName)) {
            return this.driverDetailFormGroup.controls[controlName].hasError(errorName);
        }
        return true;
    };

    submit(): void {
        // Stop here if form is invalid
        if (this.userForm.valid && this.detailFormGroup.valid) {
            this.onSubmit.emit(this.userForm.value);
        }
    }

    removeSelectedRole(role: Role): void {
        this.userForm.controls['roles'].setValue(
            this.userForm.value.roles.filter(r => r !== role)
        );
    }

}
