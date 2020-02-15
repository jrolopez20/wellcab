import {Component, OnInit} from '@angular/core';
import {LicenseService} from '@app/store/features/license/license.service';
import {Observable, Subject} from 'rxjs';
import {License} from '@app/store/models/license.model';
import {Contract} from '@app/store/models/contract.model';
import {Location} from '@angular/common';

@Component({
    selector: 'app-contract-history',
    templateUrl: './contract-history.component.html',
    styleUrls: ['./contract-history.component.css']
})
export class ContractHistoryComponent implements OnInit {
    public currentLicense$: Observable<License>;
    public license: License;
    public selectedContract = new Subject<Contract>();

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

    handleContractChange(contract: Contract) {
        this.selectedContract.next(contract);
    }

}
