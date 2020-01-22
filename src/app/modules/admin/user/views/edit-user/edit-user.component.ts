import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {isNumeric} from 'rxjs/internal-compatibility';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
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
        this.loadUserData(this.userId);
    }

    initUserForm() {
        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
        });
    }

    loadUserData(id: number) {
        // this.userService.findById(id).subscribe(res => {
        //     this.userForm.patchValue({
        //         ...res
        //     });
        // });
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
