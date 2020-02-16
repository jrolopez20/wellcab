import {Component, OnDestroy, OnInit} from '@angular/core';
import {LicenseService} from '@app/store/features/license/license.service';
import {Subject, Subscription} from 'rxjs';
import {License} from '@app/store/models/license.model';
import {Contract} from '@app/store/models/contract.model';
import {Location} from '@angular/common';

@Component({
    selector: 'app-contract-history',
    templateUrl: './contract-history.component.html',
    styleUrls: ['./contract-history.component.css']
})
export class ContractHistoryComponent implements OnInit, OnDestroy {
    public license: License;
    public selectedContract = new Subject<Contract>();
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

    handleContractChange(contract: Contract) {
        this.selectedContract.next(contract);
    }

}
