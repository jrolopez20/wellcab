import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {City} from '@app/store/models/city.model';

@Component({
    selector: 'app-city-form',
    templateUrl: './city-form.component.html',
})
export class CityFormComponent implements OnInit {
    @Input() title: string;
    @Input() city: City;
    @Output() onSubmit = new EventEmitter<City>();
    cityForm: FormGroup;
    loading = false;
    error: '';

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.initCityForm();
    }

    initCityForm() {
        this.cityForm = this.formBuilder.group({
            name: [this.city ? this.city.name : '', Validators.required]
        });
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.cityForm.controls;
    }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.f[controlName].hasError(errorName);
    };

    submit(): void {
        // Stop here if form is invalid
        if (this.cityForm.valid) {
            this.onSubmit.emit(this.cityForm.value);
        }
    }

}
