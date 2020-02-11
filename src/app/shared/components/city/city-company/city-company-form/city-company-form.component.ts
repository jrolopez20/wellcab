import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {CityCompany} from '@app/store/models/city-company.model';
import {CityCompanyService} from '@app/store/features/city-company/city-company.service';
import {CompanyListDialogComponent} from '@app/shared/components/company/company-list-dialog/company-list-dialog.component';

@Component({
    selector: 'app-city-company-form',
    templateUrl: './city-company-form.component.html',
    styleUrls: ['./city-company-form.component.css']
})
export class CityCompanyFormComponent implements OnInit {
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    public cityCompanyForm: FormGroup;
    public companyFormGroup: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CityCompanyFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string, cityId: number, cityCompany?: CityCompany },
        private formBuilder: FormBuilder,
        public router: Router,
        private cityCompanyService: CityCompanyService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.cityCompanyService.getIsLoading$();
        this.error$ = this.cityCompanyService.getError$();
        this.initCityCompanyForm();
    }

    initCityCompanyForm() {
        this.companyFormGroup = this.formBuilder.group({
            id: ['', Validators.required],
            name: ['', Validators.required],
        });

        this.cityCompanyForm = this.formBuilder.group({
            company: this.companyFormGroup,
            postalCode: new FormControl('', Validators.compose([
                Validators.minLength(5),
                Validators.maxLength(5)
            ])),
            address: ['', Validators.maxLength(255)],
        });

        if (this.data.cityCompany) {
            this.cityCompanyForm.patchValue(this.data.cityCompany);
        }
    }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        if (this.cityCompanyForm.contains(controlName)) {
            return this.cityCompanyForm.controls[controlName].hasError(errorName);
        } else if (this.companyFormGroup.contains(controlName)) {
            return this.companyFormGroup.controls[controlName].hasError(errorName);
        }
        return true;
    };

    submit(): void {
        if (this.cityCompanyForm.valid) {
            this.cityCompanyService.saveCityCompany(this.data.cityId, this.cityCompanyForm.getRawValue());
            this.isLoading$.subscribe(loading => {
                if (!loading) {
                    this.dialogRef.close(this.cityCompanyForm.getRawValue());
                }
            });
        }
    }

    showCompanyDialog() {
        const dialogRef = this.dialog.open(CompanyListDialogComponent, {
            minWidth: '500px',
            data: {
                title: 'Company.Label.Companies'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.companyFormGroup.patchValue(result);
        });
    }

}
