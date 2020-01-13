import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;
    loading = false;
    returnUrl: string;
    error: '';

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            // Do not use expression for validate email, This field allow to input username too
            username: ['', Validators.required],
            email: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
        });
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.profileForm.controls;
    }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.f[controlName].hasError(errorName);
    };

    onSubmit(): void {
        // Stop here if form is invalid
        if (this.profileForm.valid) {
            this.loading = true;
        }
    }
}
