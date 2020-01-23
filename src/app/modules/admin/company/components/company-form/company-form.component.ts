import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Company} from '@app/store/models/company.model';
import {Location} from '@angular/common';

@Component({
    selector: 'app-company-form',
    templateUrl: './company-form.component.html'
})
export class CompanyFormComponent implements OnInit {
    @Input() title: string;
    @Input() company: Company;
    @Output() onSubmit = new EventEmitter<Company>();
    companyForm: FormGroup;
    loading = false;
    error: '';

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private snackBar: MatSnackBar,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.initCompanyForm();
    }

    initCompanyForm() {
        this.companyForm = this.formBuilder.group({
            name: [this.company ? this.company.name : '', Validators.required]
        });

        if (this.company) {
            this.companyForm.patchValue(this.company);
        }
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.companyForm.controls;
    }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.f[controlName].hasError(errorName);
    };

    submit(): void {
        // Stop here if form is invalid
        if (this.companyForm.valid) {
            this.onSubmit.emit(this.companyForm.value);
        }
    }

}
