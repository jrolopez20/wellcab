import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {License} from '@app/store/models/license.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {LicenseService} from '@app/store/features/license/license.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-license-form',
    templateUrl: './license-form.component.html',
    styleUrls: ['./license-form.component.css']
})
export class LicenseFormComponent implements OnInit {
    @Input() title: string;
    @Input() subtitle: string;
    @Input() license: License;
    @Output() onSubmit = new EventEmitter<License>();

    licenseForm: FormGroup;
    loading = false;
    error: '';

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private snackBar: MatSnackBar,
        private licenseService: LicenseService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.initLicenseForm();
    }

    initLicenseForm() {
        this.licenseForm = this.formBuilder.group({
            code: ['', Validators.required],
            issuesAt: ['', Validators.required],
            expirationAt: ['', Validators.required],
        });

        if (this.license) {
            this.licenseForm.patchValue(this.license);
        }
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.licenseForm.controls;
    }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.f[controlName].hasError(errorName);
    };


    submit(): void {
        // Stop here if form is invalid
        if (this.licenseForm.valid) {
            this.onSubmit.emit(this.licenseForm.value);
        }
    }

}
