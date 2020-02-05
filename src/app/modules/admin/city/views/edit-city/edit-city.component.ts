import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {City} from '@app/store/models/city.model';
import {CityService} from '@app/store/features/city/city.service';

@Component({
    selector: 'app-edit-city',
    templateUrl: './edit-city.component.html',
    styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {
    cityId = null;
    public city: City;

    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private cityService: CityService
    ) {
        this.cityId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.loadCityData(this.cityId);
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
    }

}
