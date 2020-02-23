import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '@app/store/features/user/user.service';
import CredentialValidators from '@app/shared/validators/credential-validators';

@Component({
    selector: 'app-change-password-dialog',
    templateUrl: './change-password-dialog.component.html',
    styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    public changePasswordForm: FormGroup;
    public hidePassword = true;
    public hideRepeatedPassword = true;

    constructor(
        public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
        private formBuilder: FormBuilder,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.userService.getIsLoading$();
        this.error$ = this.userService.getError$();

        this.changePasswordForm = this.formBuilder.group({
            oldPassword: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(255)
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(255)
            ])),
            confirmPassword: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(255)
            ])),
        }, {
            // Check if password and confirm password match
            validator: CredentialValidators.passwordMatchValidator
        });
    }

    /* Get errors */
    handleError (controlName: string, errorName: string) {
        return this.changePasswordForm.controls[controlName].hasError(errorName);
    }

    submit() {
        if (this.changePasswordForm.valid) {
            const {oldPassword, password} = this.changePasswordForm.getRawValue();
            this.userService.changePassword(oldPassword, password);

            this.isLoading$.subscribe(loading => {
                if (!loading) {
                    this.dialogRef.close();
                }
            });
        }
    }
}
