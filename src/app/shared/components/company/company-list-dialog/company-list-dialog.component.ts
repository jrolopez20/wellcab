import {Component, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Company} from '@app/store/models/company.model';
import {Role} from '@app/store/models/user.model';

@Component({
    selector: 'app-company-list-dialog',
    templateUrl: './company-list-dialog.component.html',
    styleUrls: ['./company-list-dialog.component.css']
})
export class CompanyListDialogComponent implements OnInit {
    public company: Company;

    constructor(
        public dialogRef: MatDialogRef<CompanyListDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string }
    ) {
    }

    ngOnInit() {
    }

    handleSelection(company?: Company) {
        this.company = company;
    }

    acept() {
        this.dialogRef.close(this.company);
    }

}
