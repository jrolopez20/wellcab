import {Component, OnInit} from '@angular/core';
import {License} from '@app/store/models/license.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LicenseService} from '@app/store/features/license/license.service';

@Component({
    selector: 'app-list-license',
    templateUrl: './list-license.component.html',
    styleUrls: ['./list-license.component.css']
})
export class ListLicenseComponent implements OnInit {

    constructor(
        private router: Router,
        private _route: ActivatedRoute,
        private licenseService: LicenseService,
    ) {
    }

    ngOnInit() {
    }

    showContracts(license: License) {
        this.licenseService.setCurrentLicense(license);
        this.router.navigate([license.id, 'contracts'], {relativeTo: this._route});
    }

    showVehicles(license: License) {
        this.licenseService.setCurrentLicense(license);
        this.router.navigate([license.id, 'vehicles'], {relativeTo: this._route});
    }

    showDrivers(license: License) {
        this.licenseService.setCurrentLicense(license);
        this.router.navigate([license.id, 'drivers'], {relativeTo: this._route});
    }

}
