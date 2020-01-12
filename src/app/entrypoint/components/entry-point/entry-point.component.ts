import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EntryPoint} from '../../models/entry-point.model';
import {EntryPointService} from '../../services/entry-point.service';
import {PageTitleService} from '../../../core/services/page-title.service';


@Component({
    selector: 'app-entry-point',
    templateUrl: './entry-point.component.html',
    styleUrls: ['./entry-point.component.css']
})
export class EntryPointComponent implements OnInit {
    entryPointForm: FormGroup;
    loading = false;
    error: '';
    entryPoints: EntryPoint[];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private entryPointService: EntryPointService,
        private pageTitleService: PageTitleService
    ) {
    }

    ngOnInit() {
        this.pageTitleService.title = 'Entry point';
        const user = null;
        this.entryPoints = this.entryPointService.getCollection(user);
        this.entryPointForm = this.formBuilder.group({
            entrypoint: ['', Validators.required]
        });
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.entryPointForm.controls;
    }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.f[controlName].hasError(errorName);
    };

    onSubmit(): void {
        // Stop here if form is invalid
        if (this.entryPointForm.valid) {
            // Load dashboard based on entry point
            this.router.navigate(['']);
        }
    }

}
