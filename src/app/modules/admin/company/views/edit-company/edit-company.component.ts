import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {CompanyService} from '@app/store/features/company/company.service';
import {Company} from '@app/store/models/company.model';

@Component({
    selector: 'app-edit-company',
    templateUrl: './edit-company.component.html',
    styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
    companyForm: FormGroup;
    loading = false;
    error = null;
    companyId = null;
    public company: Company;

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private companyService: CompanyService,
        private snackBar: MatSnackBar
    ) {
        this.companyId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.initCompanyForm();
        this.loadCompanyData(this.companyId);
    }

    initCompanyForm() {
        this.companyForm = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    loadCompanyData(id) {
        this.companyService.getCompaniesList$().subscribe(companies => {
            this.company = companies.find(company => company.id.toString() === id);
            if (!this.company) {
                this.router.navigateByUrl('');
            }
        });
    }

    handleSubmit(company: Company) {
    }

}
