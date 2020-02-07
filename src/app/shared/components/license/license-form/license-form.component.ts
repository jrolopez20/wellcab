import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {License} from '@app/store/models/license.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {LicenseService} from '@app/store/features/license/license.service';
import {DatePipe, Location} from '@angular/common';
import {Observable} from 'rxjs';
import * as moment from 'moment';

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

    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    licenseForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private snackBar: MatSnackBar,
        private licenseService: LicenseService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.licenseService.getIsLoading$();
        this.error$ = this.licenseService.getError$();
        this.initLicenseForm();
    }

    initLicenseForm() {
        this.licenseForm = this.formBuilder.group({
            code: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(15),
                Validators.maxLength(20)
            ])),
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
            const license = this.licenseForm.getRawValue();
            license.issuesAt = moment(license.issuesAt).format('YYYY-MM-DD');
            license.expirationAt = moment(license.expirationAt).format('YYYY-MM-DD');
            console.log(moment(license.issuesAt).date())
            if (this.license) {
                license.id = this.license.id;
                this.licenseService.setLicense(license);
            } else {
                this.licenseService.addLicense(license);
            }
            this.onSubmit.emit(license);
        }
    }

}
