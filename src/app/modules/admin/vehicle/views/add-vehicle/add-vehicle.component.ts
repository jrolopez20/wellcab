import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-add-vehicle',
    templateUrl: './add-vehicle.component.html',
    styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

    constructor(private location: Location) {
    }

    ngOnInit() {
    }

    handleSubmit() {
        this.location.back();
    }

}
