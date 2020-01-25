import {Component, OnInit} from '@angular/core';
import {User} from '@app/store/models/user.model';
import {City} from '@app/store/models/city.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CityService} from '@app/store/features/city/city.service';

@Component({
    selector: 'app-city-companies',
    templateUrl: './city-companies.component.html',
    styleUrls: ['./city-companies.component.css']
})
export class CityCompaniesComponent implements OnInit {
    public city: City;

    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private cityService: CityService
    ) {
        this.loadCityData(this.activatedRoute.snapshot.paramMap.get('id'));
    }

    ngOnInit() {
    }

    loadCityData(id) {
        this.cityService.getCitiesList$().subscribe(cities => {
            if (cities) {
                this.city = cities.find(city => city.id.toString() === id);
                if (!this.city) {
                    this.router.navigate(['admin/cities']);
                }
            } else {
                this.router.navigate(['admin/cities']);
            }
        });
    }

}
