import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    userForm: FormGroup;
    loading = false;
    error: '';
    userId: number;

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.userId = params.id;
        });
    }

    ngOnInit() {
        this.initUserForm();
    }

    initUserForm() {
        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: new FormControl('', Validators.compose([
                Validators.required, Validators.email
            ])),
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
        });
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.userForm.controls;
    }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.f[controlName].hasError(errorName);
    };

    onSubmit(): void {
        // Stop here if form is invalid
        if (this.userForm.valid) {
            this.loading = true;
        }
    }

}
