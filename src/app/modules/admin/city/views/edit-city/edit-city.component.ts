import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {City} from '@app/store/models/city.model';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {CityService} from '@app/store/features/city/city.service';

@Component({
    selector: 'app-edit-city',
    templateUrl: './edit-city.component.html',
    styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {
    cityForm: FormGroup;
    loading = false;
    error = null;
    cityId = null;
    public city: City;

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private cityService: CityService,
        private snackBar: MatSnackBar
    ) {
        this.cityId = this.activatedRoute.snapshot.paramMap.get('id');
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

    loadCityData(id) {
        this.cityService.getCitiesList$().subscribe(cities => {
            this.city = cities.find(city => city.id.toString() === id);
            if (!this.city) {
                this.router.navigateByUrl('');
            }
        });
    }

    handleSubmit(city: City) {
        this.cityService.setCity(city);
    }

}
