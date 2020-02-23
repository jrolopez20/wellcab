import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Contract} from '@app/store/models/contract.model';
import {merge, Observable} from 'rxjs';
import {SharedContract} from '@app/store/models/shared-contract.model';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {SharedContractService} from '@app/store/features/shared-contract/shared-contract.service';
import {License} from '@app/store/models/license.model';
import {SharedContractFormComponent} from '@app/shared/components/shared-contract/shared-contract-form/shared-contract-form.component';
import {User} from '@app/store/models/user.model';
import {ConfirmDialogComponent} from '@app/shared/utils/delete-confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-shared-contract-list',
    templateUrl: './shared-contract-list.component.html',
    styleUrls: ['./shared-contract-list.component.css']
})
export class SharedContractListComponent implements OnInit, AfterViewInit {
    @Input() editable = true;
    @Input() license: License;
    @Input() contract: Observable<Contract>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public sharedContractsList$: Observable<SharedContract[]>;
    public sharedContractsTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    public currentContract = null;
    public initialPageSize = 25;
    public displayedColumns: string[] = ['ownerUser', 'finishedAt', 'action'];

    private filter: string;

    constructor(
        private formBuilder: FormBuilder,
        private sharedContractService: SharedContractService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.sharedContractService.getIsLoading$();
        this.sharedContractsList$ = this.sharedContractService.getSharedContractsList$();
        this.sharedContractsTotal$ = this.sharedContractService.getSharedContractsTotal$();
        this.error$ = this.sharedContractService.getError$();

        this.contract.subscribe(contract => {
            this.currentContract = contract;
            this.loadSharedContracts();
        });
        this.loadSharedContracts();
    }

    ngAfterViewInit() {
        // If the model changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadSharedContracts();
        });
    }

    search(filter: string) {
        this.filter = filter;
        this.loadSharedContracts();
    }

    loadSharedContracts() {
        if (this.currentContract) {
            this.sharedContractService.loadSharedContracts({
                licenseId: this.license.id,
                contractId: this.currentContract.id,
                sort: this.sort.active,
                order: this.sort.direction,
                page: this.paginator.pageIndex + 1,
                limit: this.paginator.pageSize || this.initialPageSize,
                filter: this.filter
            });
        } else {
            this.sharedContractService.clearStore();
        }
    }

    showDialog(sharedContract?: SharedContract) {
        const dialogRef = this.dialog.open(SharedContractFormComponent, {
            minWidth: '340px',
            data: {
                title: sharedContract ? 'SharedContract.Label.SharedContractDetail' : 'SharedContract.Label.AddSharedContract',
                licenseId: this.license.id,
                sharedContract
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result && !sharedContract) {
                // Load all the shared contracts only if a new Shared Contract is added
                this.loadSharedContracts();
            }
        });
    }

    closeSharedContract(sharedContract: SharedContract) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                message: 'SharedContract.Label.ShureToCloseSharedContract'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.sharedContractService.closeSharedContract(this.license.id);
            }
        });
    }

    getOwnerName(user: User): string {
        if (user.detail) {
            return user.detail.name + ' ' + user.detail.lastName;
        } else {
            return user.username;
        }
    }

}
