import {Component, OnInit} from '@angular/core';
import {License} from '@app/store/models/license.model';
import {ActivatedRoute} from '@angular/router';
import {VehicleService} from '@app/store/features/vehicle/vehicle.service';
import {Location} from '@angular/common';
import {LicenseService} from '@app/store/features/license/license.service';

@Component({
    selector: 'app-edit-license',
    templateUrl: './edit-license.component.html',
    styleUrls: ['./edit-license.component.css']
})
export class EditLicenseComponent implements OnInit {
    private licenseId = null;
    public license: License;

    constructor(
        private activatedRoute: ActivatedRoute,
        private licenseService: LicenseService,
        private location: Location
    ) {
        this.licenseId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.loadLicenseData(this.licenseId);
    }

    loadLicenseData(id) {
        this.licenseService.getLicensesList$().subscribe(licenses => {
            if (licenses) {
                this.license = licenses.find(user => user.id.toString() === id);
                if (!this.license) {
                    this.location.back();
                }
            } else {
                this.location.back();
            }
        });
    }

    handleSubmit() {
        this.location.back();
    }

}
