import {Component, OnDestroy, OnInit} from '@angular/core';
import {License} from '@app/store/models/license.model';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {LicenseService} from '@app/store/features/license/license.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-edit-license',
    templateUrl: './edit-license.component.html',
    styleUrls: ['./edit-license.component.css']
})
export class EditLicenseComponent implements OnInit, OnDestroy {
    public license: License;
    private subscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private licenseService: LicenseService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.loadLicenseData();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    loadLicenseData() {
        this.subscription = this.licenseService.getCurrentLicense$().subscribe(license => {
            if (license) {
                this.license = license;
            } else {
                this.location.back();
            }
        });
    }

    handleSubmit() {
        this.location.back();
    }

}
