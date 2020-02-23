import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {SharedContract} from '@app/store/models/shared-contract.model';
import {SharedContractService} from '@app/store/features/shared-contract/shared-contract.service';
import {UserListDialogComponent} from '@app/shared/components/user/user-list-dialog/user-list-dialog.component';
import {Role, User} from '@app/store/models/user.model';

@Component({
    selector: 'app-shared-contract-form',
    templateUrl: './shared-contract-form.component.html',
    styleUrls: ['./shared-contract-form.component.css']
})
export class SharedContractFormComponent implements OnInit {
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;
    public sharedContractForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<SharedContractFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string, licenseId: number, sharedContract?: SharedContract },
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private sharedContractService: SharedContractService
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.sharedContractService.getIsLoading$();
        this.error$ = this.sharedContractService.getError$();
        this.initSharedContractForm();
    }

    initSharedContractForm() {
        this.sharedContractForm = this.formBuilder.group({
            ownerUser: [{value: '', disabled: this.data.sharedContract ? this.data.sharedContract.finishedAt : false}, Validators.required]
        });
        if (this.data.sharedContract) {
            this.sharedContractForm.patchValue(this.data.sharedContract);
        }
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.sharedContractForm.controls;
    }

    /* Get errors */
    handleError(controlName: string, errorName: string) {
        return this.f[controlName].hasError(errorName);
    }

    submit(): void {
        if (this.sharedContractForm.valid) {
            const sharedContract = this.sharedContractForm.getRawValue();
            if (this.data.sharedContract) {
                this.sharedContractService.setSharedContract(this.data.licenseId, sharedContract);
            } else {
                this.sharedContractService.addSharedContract(this.data.licenseId, sharedContract);
            }
            this.isLoading$.subscribe(loading => {
                if (!loading) {
                    this.dialogRef.close(sharedContract);
                }
            });
        }
    }

    showOwnerUserDialog() {
        const dialogRef = this.dialog.open(UserListDialogComponent, {
            minWidth: '700px',
            data: {
                roles: [Role.OWNER]
            }
        });
        dialogRef.afterClosed().subscribe((result: User) => {
            if (result && this.sharedContractForm.get('ownerUser').value.id !== result.id) {
                this.sharedContractForm.get('ownerUser').setValue(result);
            }
        });
    }

    getOwnerName(): string {
        const ownerUser = this.sharedContractForm.get('ownerUser').value;
        return ownerUser ? ownerUser.username : null;
    };

}
