import {Component, OnInit} from '@angular/core';
import {City} from '@app/store/models/city.model';

@Component({
    selector: 'app-add-city',
    templateUrl: './add-city.component.html',
    styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    handleSubmit(city: City) {
    }

}
