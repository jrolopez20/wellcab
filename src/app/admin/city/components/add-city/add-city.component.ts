import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  cityForm: FormGroup;
  loading = false;
  error: '';

  constructor(
      private formBuilder: FormBuilder,
      public router: Router,
      private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.initCityForm();
  }

  initCityForm() {
    this.cityForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.cityForm.controls;
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.f[controlName].hasError(errorName);
  };

  onSubmit(): void {
    // Stop here if form is invalid
    if (this.cityForm.valid) {
      this.loading = true;
    }
  }

}
