import {Component, OnInit} from '@angular/core';
import {Color} from '@app/store/models/color.model';
import {Location} from '@angular/common';

@Component({
    selector: 'app-add-color',
    templateUrl: './add-color.component.html',
    styleUrls: ['./add-color.component.css']
})
export class AddColorComponent implements OnInit {

    constructor(private location: Location) {
    }

    ngOnInit() {
    }

    handleSubmit(color: Color) {
        this.location.back();
    }

}
