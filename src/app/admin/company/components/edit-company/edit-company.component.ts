import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
  companyForm: FormGroup;
  loading = false;
  error: '';
  companyId: number;

  constructor(
      private formBuilder: FormBuilder,
      public router: Router,
      private activatedRoute: ActivatedRoute,
      private companyService: CompanyService,
      private snackBar: MatSnackBar
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.companyId = params.id;
    });
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

  loadCompanyData(id: number) {
    this.companyService.findById(id).subscribe(res => {
      this.companyForm.patchValue({
        ...res
      });
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.companyForm.controls;
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.f[controlName].hasError(errorName);
  };

  onSubmit(): void {
    // Stop here if form is invalid
    if (this.companyForm.valid) {
      this.loading = true;
    }
  }

}
