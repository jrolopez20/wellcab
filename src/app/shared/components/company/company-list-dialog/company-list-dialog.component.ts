import {Component, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Company} from '@app/store/models/company.model';

@Component({
    selector: 'app-company-list-dialog',
    templateUrl: './company-list-dialog.component.html',
    styleUrls: ['./company-list-dialog.component.css']
})
export class CompanyListDialogComponent implements OnInit {
    private company: Company;

    constructor(
        public dialogRef: MatDialogRef<CompanyListDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string },
    ) {
    }

    ngOnInit() {
    }

    handleSelection(company?: Company) {
        this.company = company;
    }

    selectCompany() {
        // TODO emit event with the selected company
        this.dialogRef.close(this.company);
    }

}
