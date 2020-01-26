import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Color} from '@app/store/models/color.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Location} from '@angular/common';

@Component({
    selector: 'app-color-form',
    templateUrl: './color-form.component.html',
    styleUrls: ['./color-form.component.css']
})
export class ColorFormComponent implements OnInit {
    @Input() title: string;
    @Input() color: Color;
    @Output() onSubmit = new EventEmitter<Color>();
    colorForm: FormGroup;
    loading = false;
    error: '';

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private snackBar: MatSnackBar,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.initColorForm();
    }

    initColorForm() {
        this.colorForm = this.formBuilder.group({
            name: ['', Validators.required],
            value: ['', Validators.required]
        });

        if (this.color) {
            this.colorForm.patchValue(this.color);
        }
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.colorForm.controls;
    }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.f[controlName].hasError(errorName);
    };

    submit(): void {
        // Stop here if form is invalid
        if (this.colorForm.valid) {
            const c = this.colorForm.value
            this.onSubmit.emit(c);
        }
    }

}
