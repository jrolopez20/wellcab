import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {CompanyService} from '../../services/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
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
  }

  initCompanyForm() {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
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
