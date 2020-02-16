import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {License} from '@app/store/models/license.model';
import {LicenseService} from '@app/store/features/license/license.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-vehicle-history',
    templateUrl: './vehicle-history.component.html',
    styleUrls: ['./vehicle-history.component.css']
})
export class VehicleHistoryComponent implements OnInit, OnDestroy {
    public license: License;
    private subscription: Subscription;

    constructor(
        private licenseService: LicenseService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.subscription = this.licenseService.getCurrentLicense$().subscribe(license => {
            if (license) {
                this.license = license;
            } else {
                this.location.back();
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
