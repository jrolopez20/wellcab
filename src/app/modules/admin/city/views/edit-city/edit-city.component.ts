import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-edit-city',
    templateUrl: './edit-city.component.html',
    styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {
    cityForm: FormGroup;
    loading = false;
    error: '';
    cityId: number;

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.cityId = params.id;
        });
    }

    ngOnInit() {
        this.initCityForm();
        this.loadCityData(this.cityId);
    }

    initCityForm() {
        this.cityForm = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    loadCityData(id: number) {
        // this.cityService.findById(id).subscribe(res => {
        //     this.cityForm.patchValue({
        //         ...res
        //     });
        // });
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.cityForm.controls;
    }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.f[controlName].hasError(errorName);
    };

    onSubmit(): void {
        // Stop here if form is invalid
        if (this.cityForm.valid) {
            this.loading = true;
        }
    }

}
