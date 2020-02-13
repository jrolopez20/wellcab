import {Component, OnInit} from '@angular/core';
import {Color} from '@app/store/models/color.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ColorService} from '@app/store/features/color/color.service';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {async} from 'rxjs/internal/scheduler/async';
import {catchError, first} from 'rxjs/operators';

@Component({
    selector: 'app-edit-color',
    templateUrl: './edit-color.component.html',
    styleUrls: ['./edit-color.component.css']
})
export class EditColorComponent implements OnInit {
    private color: Color;
    private colorId;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private colorService: ColorService
    ) {
        this.colorId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.loadColorData(this.colorId);
    }

    loadColorData(id) {
        this.colorService.getColorsList$().subscribe(colors => {
            this.color = colors ? colors.find(color => color.id.toString() === id) : null;
            if (!this.color) {
                this.router.navigate(['managment/colors']);
            }
        });
    }

    handleSubmit(color: Color) {
        if (color) {
            this.location.back();
        }
    }
}
