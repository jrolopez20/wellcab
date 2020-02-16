import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '@app/store/features/company/company.service';
import {Company} from '@app/store/models/company.model';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';

@Component({
    selector: 'app-edit-company',
    templateUrl: './edit-company.component.html',
    styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit, OnDestroy {
    companyForm: FormGroup;
    loading = false;
    error = null;
    companyId = null;
    public company: Company;
    private subscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private companyService: CompanyService,
        private location: Location
    ) {
        this.companyId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.initCompanyForm();
        this.loadCompanyData(this.companyId);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    initCompanyForm() {
        this.companyForm = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    loadCompanyData(id) {
        this.subscription = this.companyService.getCompaniesList$().subscribe(companies => {
            if(companies) {
                this.company = companies.find(company => company.id.toString() === id);
                if (!this.company) {
                    this.location.back();
                }
            }else {
                this.location.back();
            }
        });
    }

    handleSubmit(company: Company) {
        this.location.back();
    }

}
