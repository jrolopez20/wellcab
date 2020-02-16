import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {City} from '@app/store/models/city.model';
import {CityService} from '@app/store/features/city/city.service';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-edit-city',
    templateUrl: './edit-city.component.html',
    styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit, OnDestroy {
    cityId = null;
    public city: City;
    private subscription: Subscription;

    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private cityService: CityService,
        private location: Location
    ) {
        this.cityId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.loadCityData(this.cityId);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    loadCityData(id) {
        this.subscription = this.cityService.getCitiesList$().subscribe(cities => {
            this.city = cities.find(city => city.id.toString() === id);
            if (!this.city) {
                this.location.back();
            }
        });
    }

    handleSubmit(city: City) {
    }

}
