import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Contract} from '@app/store/models/contract.model';
import {ContractService} from '@app/store/features/contract/contract.service';
import {CompanyListDialogComponent} from '@app/shared/components/company/company-list-dialog/company-list-dialog.component';
import {Company} from '@app/store/models/company.model';
import {City} from '@app/store/models/city.model';
import {CityService} from '@app/store/features/city/city.service';

@Component({
    selector: 'app-contract-form',
    templateUrl: './contract-form.component.html',
    styleUrls: ['./contract-form.component.css']
})
export class ContractFormComponent implements OnInit {
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    public contractForm: FormGroup;
    public isLoadingCity$: Observable<boolean>;
    public cities$: Observable<City[]>;

    constructor(
        public dialogRef: MatDialogRef<ContractFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string, licenseId: number, contract?: Contract },
        private formBuilder: FormBuilder,
        private contractService: ContractService,
        private dialog: MatDialog,
        private cityService: CityService
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.contractService.getIsLoading$();
        this.error$ = this.contractService.getError$();
        this._loadCities();
        this.initContractForm();
        this.cities$ = this.cityService.getCitiesList$();
        this.isLoadingCity$ = this.cityService.getIsLoading$();
    }

    initContractForm() {
        this.contractForm = this.formBuilder.group({
            city: [{value: '', disabled: this.data.contract ? this.data.contract.finishedAt : false}, Validators.required],
            company: [{value: '', disabled: this.data.contract ? this.data.contract.finishedAt : false}, Validators.required]
        });
        if (this.data.contract) {
            this.contractForm.get('company').setValue(this.data.contract.company);
            this.contractForm.get('city').setValue(this.data.contract.city.id);
        }
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.contractForm.controls;
    }

    /* Get errors */
    public handleError(controlName: string, errorName: string) {
        return this.f[controlName].hasError(errorName);
    }

    submit(): void {
        if (this.contractForm.valid) {
            const contract = this.contractForm.getRawValue();
            if (this.data.contract) {
                this.contractService.setContract(this.data.licenseId, contract);
            } else {
                this.contractService.addContract(this.data.licenseId, contract);
            }
            this.isLoading$.subscribe(loading => {
                if (!loading) {
                    this.dialogRef.close(contract);
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
        dialogRef.afterClosed().subscribe((result: Company) => {
            if (result && this.contractForm.get('company').value.id !== result.id) {
                this.contractForm.get('company').setValue(result);
            }
        });
    }

    getCompanyName(): string {
        const company = this.contractForm.get('company').value;
        return company ? `${company.name} - CIF: ${company.cif}` : null;
    }

    private _loadCities() {
        this.cityService.loadCities({
            sort: 'name',
            order: 'DESC',
            page: 1,
            limit: '',
            filter: ''
        });
    }

}
