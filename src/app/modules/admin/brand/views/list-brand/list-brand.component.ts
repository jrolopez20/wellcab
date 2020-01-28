import {Component, OnInit} from '@angular/core';
import {Brand} from '@app/store/models/brand.model';
import {Observable, of, Subject} from 'rxjs';

@Component({
    selector: 'app-list-brand',
    templateUrl: './list-brand.component.html',
    styleUrls: ['./list-brand.component.css']
})
export class ListBrandComponent implements OnInit {
    public selectedBrand = new Subject<Brand>();

    constructor() {
    }

    ngOnInit() {
    }

    handleBrandChange(brand: Brand) {
        this.selectedBrand.next(brand);
    }
}
