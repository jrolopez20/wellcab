import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Brand} from '@app/store/models/brand.model';
import {BrandService} from '@app/store/features/brand/brand.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-brand-form',
    templateUrl: './brand-form.component.html',
    styleUrls: ['./brand-form.component.css']
})
export class BrandFormComponent implements OnInit {
    public brandForm: FormGroup;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    constructor(
        public dialogRef: MatDialogRef<BrandFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string, brand?: Brand },
        private formBuilder: FormBuilder,
        private brandService: BrandService
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.brandService.getIsLoading$();
        this.error$ = this.brandService.getError$();
        this.initBrandForm();
    }

    initBrandForm() {
        this.brandForm = this.formBuilder.group({
            name: ['', Validators.required]
        });

        if (this.data.brand) {
            this.brandForm.patchValue(this.data.brand);
        }
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.brandForm.controls;
    }

    /* Get errors */
    handleError(controlName: string, errorName: string) {
        return this.f[controlName].hasError(errorName);
    }

    submit(): void {
        if (this.brandForm.valid) {
            const brand = this.brandForm.getRawValue();
            if (this.data.brand) {
                brand.id = this.data.brand.id;
                this.brandService.setBrand(brand);
            } else {
                this.brandService.addBrand(brand);
            }
            this.isLoading$.subscribe(loading => {
                if (!loading) {
                    this.dialogRef.close(brand);
                }
            });
        }
    }

}
