import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '@app/modules/auth/services/authentication.service';
import {first} from 'rxjs/operators';

import {PageTitleService} from '@app/core/services/page-title.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    returnUrl: string;
    error: '';
    appTitle = 'Gestvtc';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private pageTitleService: PageTitleService
    ) {
        if (this.authenticationService.currentUserValue) {
            // Redirect to secure area if already logged in
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.pageTitleService.title = 'Login';
        this.loginForm = this.formBuilder.group({
            // Do not use expression for validate email, This field allow to input username too
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.f[controlName].hasError(errorName);
    };

    onSubmit(): void {
        // Stop here if form is invalid
        if (this.loginForm.valid) {
            this.loading = true;
            this.authenticationService.login(this.f.email.value, this.f.password.value)
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate(['/']);
                    },
                    error => {
                        this.error = error;
                        this.loading = false;
                    }
                );
        }
    }

}
