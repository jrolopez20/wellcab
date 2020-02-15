import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {License} from '@app/store/models/license.model';
import {LicenseService} from '@app/store/features/license/license.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-vehicle-history',
    templateUrl: './vehicle-history.component.html',
    styleUrls: ['./vehicle-history.component.css']
})
export class VehicleHistoryComponent implements OnInit {
    public currentLicense$: Observable<License>;
    public license: License;

    constructor(
        private licenseService: LicenseService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.currentLicense$ = this.licenseService.getCurrentLicense$();
        this.currentLicense$.subscribe(license => {
            if (license) {
                this.license = license;
            } else {
                this.location.back();
            }
        });
    }

}
