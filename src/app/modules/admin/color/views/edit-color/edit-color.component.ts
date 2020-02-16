import {Component, OnDestroy, OnInit} from '@angular/core';
import {Color} from '@app/store/models/color.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ColorService} from '@app/store/features/color/color.service';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-edit-color',
    templateUrl: './edit-color.component.html',
    styleUrls: ['./edit-color.component.css']
})
export class EditColorComponent implements OnInit, OnDestroy {
    private color: Color;
    private colorId;
    private subscription: Subscription;

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

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    loadColorData(id) {
        this.subscription = this.colorService.getColorsList$().subscribe(colors => {
            this.color = colors ? colors.find(color => color.id.toString() === id) : null;
            if (!this.color) {
                this.location.back();
            }
        });
    }

    handleSubmit(color: Color) {
        if (color) {
            this.location.back();
        }
    }
}
