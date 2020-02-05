import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Company} from '@app/store/models/company.model';
import {Location} from '@angular/common';
import {CompanyService} from '@app/store/features/company/company.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-company-form',
    templateUrl: './company-form.component.html'
})
export class CompanyFormComponent implements OnInit {
    @Input() title: string;
    @Input() company: Company;
    @Output() onSubmit = new EventEmitter<Company>();

    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    companyForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private snackBar: MatSnackBar,
        private location: Location,
        private companyService: CompanyService
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.companyService.getIsLoading$();
        this.error$ = this.companyService.getError$();

        this.initCompanyForm();
    }

    initCompanyForm() {
        this.companyForm = this.formBuilder.group({
            name: ['', Validators.required],
            cif: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(9)
            ])),
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
        if (this.companyForm.valid) {
            if (this.company) {
                this.companyService.setCompany(this.company.id, this.companyForm.getRawValue());

            } else {
                this.companyService.addCompany(this.companyForm.getRawValue());
            }
        }
    }

}
