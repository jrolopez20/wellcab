import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Color} from '@app/store/models/color.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {ColorService} from '@app/store/features/color/color.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-color-form',
    templateUrl: './color-form.component.html',
    styleUrls: ['./color-form.component.css']
})
export class ColorFormComponent implements OnInit {
    @Input() title: string;
    @Input() color: Color;
    @Output() onSubmit = new EventEmitter<Color>();

    public isLoading$: Observable<boolean>;
    public colorForm: FormGroup;
    public error: '';

    constructor(
        public location: Location,
        private formBuilder: FormBuilder,
        private colorService: ColorService
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.colorService.getIsLoading$();
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
    handleError(controlName: string, errorName: string) {
        return this.f[controlName].hasError(errorName);
    }

    submit(): void {
        // Stop here if form is invalid
        if (this.colorForm.valid) {
            const color = this.colorForm.value;
            if (this.color) {
                color.id = this.color.id;
                this.colorService.setColor(color);
            } else {
                this.colorService.addColor(color);
            }
            this.isLoading$.subscribe(loading => {
                if (!loading) {
                    this.onSubmit.emit(color);
                }
            });
        }
    }

    colorPickerChanged(colorValue) {
        this.colorForm.get('value').setValue(colorValue);
    }

}
