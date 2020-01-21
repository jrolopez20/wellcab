import {Component, OnInit} from '@angular/core';
import {City} from '@app/store/models/city.model';
import {CityService} from '@app/store/features/city/city.service';

@Component({
    selector: 'app-add-city',
    templateUrl: './add-city.component.html',
    styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

    constructor(private cityService: CityService) {
    }

    ngOnInit() {
    }

    handleSubmit(city: City) {
        console.log('Add city', city);
        // this.cityService.
    }

}
