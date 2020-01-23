import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {AuthenticationService} from '@app/modules/auth/services/authentication.service';
import {AuthService} from '@app/store/features/auth/auth.service';
import {first} from 'rxjs/operators';

import {PageTitleService} from '@app/core/services/page-title.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public error$: Observable<any>;
    public isLoading$: Observable<boolean>;
    public loginForm: FormGroup;
    private appTitle = 'Gestvtc';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private pageTitleService: PageTitleService
    ) {
    }

    ngOnInit() {
        this.error$ = this.authService.getError$();
        this.isLoading$ = this.authService.getIsLoading$();

        this.pageTitleService.title = 'Login';
        this.loginForm = this.formBuilder.group({
            // Do not use expression for validate email, This field allow to input username too
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    /**
     * Convenience getter for easy access to form fields
     */
    private get f() {
        return this.loginForm.controls;
    }

    /**
     * Get errors
     * @param controlName
     * @param errorName
     */
    public handleError = (controlName: string, errorName: string) => {
        return this.f[controlName].hasError(errorName);
    };

    onSubmit(): void {
        // Stop here if form is invalid
        if (this.loginForm.valid) {
            this.authService.login(this.f.email.value, this.f.password.value);
        }
    }

}
