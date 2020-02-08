import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-add-license',
    templateUrl: './add-license.component.html',
    styleUrls: ['./add-license.component.css']
})
export class AddLicenseComponent implements OnInit {

    constructor(private location: Location) {
    }

    ngOnInit() {
    }

    handleSubmit() {
        this.location.back();
    }

}
