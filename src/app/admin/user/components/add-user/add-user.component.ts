import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    userForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    private maxDate: Date;

    constructor(
        public fb: FormBuilder,
        private router: Router,
        private userService: UserService,
        private snackBar: MatSnackBar
    ) {
        this.maxDate = new Date();
    }

    ngOnInit() {
        this.initUserForm();
    }

    initUserForm() {
        this.userForm = this.fb.group({
            email: new FormControl('example@gmail.com', Validators.compose([
                Validators.required, Validators.email
            ])),
            firstName: ['me', [Validators.required]],
            lastName: ['you', [Validators.required]],
            dob: ['', [Validators.required]],
            gender: ['Male']
        });
    }

    get f() {
        return this.userForm.controls;
    }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.userForm.controls[controlName].hasError(errorName);
    }

    onSubmit() {
        this.submitted = true;

        if (this.userForm.valid) {
            this.userService.add(this.userForm.value)
                .subscribe(
                    data => {
                        console.log('succesfull');
                        this.router.navigate(['users']);
                    },
                    error => {
                        this.loading = false;
                        this.snackBar.open(error, 'Close', {
                            duration: 2000,
                            horizontalPosition: 'right'
                        });
                    }
                );
        }
    }

}
