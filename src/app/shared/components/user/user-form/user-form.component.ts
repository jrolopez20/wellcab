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
    loading = false;
    error: '';
    private roles: Role[];
    private removable = true;
    private hidePassword = true;
    private hideRepeatedPassword = true;

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
        this.detailFormGroup = this.formBuilder.group({
            name: new FormControl('Javier', Validators.compose([
                Validators.required,
                Validators.maxLength(45)
            ])),
            lastName: new FormControl('Rodriguez', Validators.compose([
                Validators.required,
                Validators.maxLength(45)
            ])),
            documentType: ['0', Validators.required],
            identificationDocument: new FormControl('123456789', Validators.compose([
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(9)
            ])),
            address: [''],
            mainContactPhone: new FormControl('5354171247', Validators.compose([
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(20)
            ])),
            secondaryContactPhone: new FormControl('', Validators.compose([
                Validators.minLength(9),
                Validators.maxLength(45)
            ])),
            bankAccountNumber: new FormControl('', Validators.compose([
                Validators.minLength(24),
                Validators.maxLength(24)
            ])),
            socialSecurityNumber: new FormControl('', Validators.compose([
                Validators.minLength(12),
                Validators.maxLength(12)
            ])),
        });

        this.userForm = this.formBuilder.group({
            username: ['jhon', Validators.required],
            email: new FormControl('jhon@gmail.com', Validators.compose([
                Validators.required, Validators.email
            ])),
            roles: ['', Validators.required],
            hasAccess: [true],
            plainPassword: ['', Validators.required],
            // TODO Create a validator function to check if password match
            repeatPassword: [''],
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
        }
        return true;
    };

    submit(): void {
        // Stop here if form is invalid
        if (this.userForm.valid && this.detailFormGroup.valid) {
            const user = this.userForm.getRawValue();
            console.log(user);
            if (this.user) {
                user.id = this.user.id;
                this.userService.setUser(user);
            } else {
                this.userService.addUser(user);
            }
        }
    }

    removeSelectedRole(role: Role): void {
        this.userForm.controls['roles'].setValue(
            this.userForm.value.roles.filter(r => r !== role)
        );
    }

}
