import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Role, User} from '@app/store/models/user.model';
import {UserService} from '@app/store/features/user/user.service';
import {Location} from '@angular/common';
import CredentialValidators from '@app/shared/validators/credential-validators';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, AfterViewInit {
    @Input() title: string;
    @Input() subtitle: string;
    @Input() user: User;
    @Input() hideRole: boolean;
    @Input() readOnly: boolean;
    @Output() onSubmit = new EventEmitter<User>();

    userForm: FormGroup;
    detailFormGroup: FormGroup;
    public isLoading$: Observable<boolean>;
    error: '';
    private roles: Role[];
    private removable = true;
    private hidePassword = true;
    private hideRepeatedPassword = true;

    private documentTypes = [
        {id: 1, name: 'DNI'},
        {id: 2, name: 'NIE'},
        {id: 3, name: 'NIF'},
        {id: 4, name: 'CIF'},
    ];

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private snackBar: MatSnackBar,
        private userService: UserService,
        private location: Location
    ) {
        this.roles = this.userService.getRolesAvailable();
        this.isLoading$ = userService.getIsLoading$();
    }

    ngOnInit() {
        this.initUserForm();
    }

    ngAfterViewInit(): void {
    }

    initUserForm() {
        this.detailFormGroup = this.formBuilder.group({
            name: new FormControl({value: '', disabled: this.readOnly}, Validators.compose([
                Validators.required,
                Validators.maxLength(45)
            ])),
            lastName: new FormControl({value: '', disabled: this.readOnly}, Validators.compose([
                Validators.required,
                Validators.maxLength(45)
            ])),
            documentType: [{value: 1, disabled: this.readOnly}, Validators.required],
            identificationDocument: new FormControl({value: '', disabled: this.readOnly}, Validators.compose([
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(9)
            ])),
            address: [{value: '', disabled: this.readOnly}],
            mainContactPhone: new FormControl({value: '', disabled: this.readOnly}, Validators.compose([
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(20)
            ])),
            secondaryContactPhone: new FormControl({value: '', disabled: this.readOnly}, Validators.compose([
                Validators.minLength(9),
                Validators.maxLength(45)
            ])),
            bankAccountNumber: new FormControl({value: '', disabled: this.readOnly}, Validators.compose([
                Validators.minLength(24),
                Validators.maxLength(24)
            ])),
            socialSecurityNumber: new FormControl({value: '', disabled: this.readOnly}, Validators.compose([
                Validators.minLength(12),
                Validators.maxLength(12)
            ])),
        });

        this.userForm = this.formBuilder.group({
            username: new FormControl({value: '', disabled: this.readOnly}, Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(255)
            ])),
            email: new FormControl({value: '', disabled: this.readOnly}, Validators.compose([
                Validators.required, Validators.email
            ])),
            roles: ['', Validators.required],
            hasAccess: [true],
            detail: this.detailFormGroup,
        }, {
            // Check if password and confirm password match
            validator: CredentialValidators.passwordMatchValidator
        });

        if (!this.user) {
            // Passwords are required for new users
            this.userForm.addControl('password', new FormControl(
                '', [Validators.compose(
                    [Validators.required]
                )]
            ));
            this.userForm.addControl('confirmPassword', new FormControl(
                '', [Validators.compose(
                    [Validators.required]
                )]
            ));
        }

        if (this.user) {
            const user = {...this.user};
            if (!this.user.detail) {
                user.detail = {
                    name: '',
                    lastName: '',
                    documentType: null,
                    identificationDocument: null,
                    mainContactPhone: null,
                    secondaryContactPhone: null,
                    bankAccountNumber: null,
                    address: '',
                    socialSecurityNumber: null
                };
            } else {
                if (this.readOnly) {
                    const mask = () => {
                        const numbers = user.detail.bankAccountNumber.slice(-3);
                        const hidenNumbers = user.detail.bankAccountNumber.slice(0, -3);
                        let hidden = '';
                        for (let i = 0; i < hidenNumbers.length; i++) {
                            hidden += '*';
                        }
                        return hidden + numbers;
                    };

                    user.detail = {...user.detail, bankAccountNumber: mask()};
                }
            }
            this.userForm.patchValue(user);
        }
    }

    /**
     * Handler function to show or hide passwords fields base on hasAccess property
     * @param slider
     */
    onHasAccessChange(slider) {
        if (!this.user) {
            if (slider.checked) {
                // Passwords are required for new users
                this.userForm.addControl('password', new FormControl(
                    '', [Validators.compose(
                        [Validators.required]
                    )]
                ));
                this.userForm.addControl('confirmPassword', new FormControl(
                    '', [Validators.compose(
                        [Validators.required]
                    )]
                ));
            } else {
                this.userForm.removeControl('confirmPassword');
                this.userForm.removeControl('password');
            }
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
            if (this.user) {
                user.id = this.user.id;
                this.userService.setUser(user);
            } else {
                user.plainPassword = user.password;
                // Remove this properties because they are not required for the api endpoint
                delete user.password;
                delete user.confirmPassword;
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
