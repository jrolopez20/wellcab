import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {City} from '@app/store/models/city.model';
import {Location} from '@angular/common';
import {CityService} from '@app/store/features/city/city.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-city-form',
    templateUrl: './city-form.component.html',
})
export class CityFormComponent implements OnInit {
    @Input() title: string;
    @Input() city: City;
    @Output() onSubmit = new EventEmitter<City>();
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    public cityForm: FormGroup;

    constructor(
        public location: Location,
        private cityService: CityService,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.cityService.getIsLoading$();
        this.error$ = this.cityService.getError$();
        this.initCityForm();
    }

    initCityForm() {
        this.cityForm = this.formBuilder.group({
            name: [this.city ? this.city.name : '', Validators.required]
        });

        if (this.city) {
            this.cityForm.patchValue(this.city);
        }
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
            if(this.city) {
                this.cityService.setCity(this.city.id, this.cityForm.getRawValue());
            }else {
                this.cityService.addCity(this.cityForm.getRawValue());
            }
        }
    }

}
