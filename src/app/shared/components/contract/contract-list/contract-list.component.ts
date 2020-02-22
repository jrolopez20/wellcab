import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {License} from '@app/store/models/license.model';
import {Contract} from '@app/store/models/contract.model';
import {merge, Observable} from 'rxjs';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {FormBuilder} from '@angular/forms';
import {ContractService} from '@app/store/features/contract/contract.service';
import {ContractFormComponent} from '@app/shared/components/contract/contract-form/contract-form.component';
import {ConfirmDialogComponent} from '@app/shared/utils/delete-confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-contract-list',
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit, AfterViewInit {
    @Input() license: License;
    @Input() editable = true;
    @Output() onContractSelectedChange = new EventEmitter<Contract>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public contractList$: Observable<Contract[]>;
    public contractsTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    private filter: string;
    private initialPageSize = 25;
    private displayedColumns: string[] = ['select', 'city', 'company', 'finishedAt', 'action'];
    private selection = new SelectionModel<Contract>(false, []);

    constructor(
        private formBuilder: FormBuilder,
        private contractService: ContractService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.contractService.getIsLoading$();
        this.contractList$ = this.contractService.getContractsList$();
        this.contractsTotal$ = this.contractService.getContractsTotal$();
        this.error$ = this.contractService.getError$();

        this.loadContracts();
        this.selection.changed.subscribe(value => {
            this.onContractSelectedChange.emit(value.source.selected.shift());
        });
    }

    ngAfterViewInit() {
        // If the brand changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadContracts();
        });
    }

    search(filter: string) {
        this.filter = filter;
        this.loadContracts();
    }

    loadContracts() {
        this.selection.clear();
        if (this.license) {
            this.contractService.loadContracts({
                licenseId: this.license.id,
                sort: this.sort.active,
                order: this.sort.direction,
                page: this.paginator.pageIndex + 1,
                limit: this.paginator.pageSize || this.initialPageSize,
                filter: this.filter
            });
        }
    }

    showDialog(contract?: Contract) {
        const dialogRef = this.dialog.open(ContractFormComponent, {
            minWidth: '400px',
            data: {
                title: contract ? 'Contract.Label.ContractDetail' : 'Contract.Label.AddContract',
                licenseId: this.license.id,
                contract
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result && !contract) {
                // Load all contracts only if a new Contract is added
                this.loadContracts();
            }
        });
    }

    closeContract(contract: Contract) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                message: 'Contract.Label.ShureToCloseContract'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.contractService.closeContract(this.license.id);
            }
        });
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Contract): string {
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} contract`;
    }

}
