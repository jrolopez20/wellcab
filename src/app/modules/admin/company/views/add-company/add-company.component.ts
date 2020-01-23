import {Component, OnInit} from '@angular/core';
import {Company} from '@app/store/models/company.model';
import {CompanyService} from '@app/store/features/company/company.service';

@Component({
    selector: 'app-add-company',
    templateUrl: './add-company.component.html',
    styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

    constructor(private companyService: CompanyService) {
    }

    ngOnInit() {
    }

    handleSubmit(company: Company) {
    }

}
