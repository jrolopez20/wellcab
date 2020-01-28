import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {Brand} from '@app/store/models/brand.model';
import {Router} from '@angular/router';
import {Model} from '@app/store/models/model.model';
import {ModelService} from '@app/store/features/model/model.service';
import {SnackBarComponent} from '@app/shared/utils/snack-bar/snack-bar.component';

@Component({
    selector: 'app-model-form',
    templateUrl: './model-form.component.html',
    styleUrls: ['./model-form.component.css']
})
export class ModelFormComponent implements OnInit {
    modelForm: FormGroup;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    constructor(
        public dialogRef: MatDialogRef<ModelFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string, brand: Brand, model?: Model },
        private formBuilder: FormBuilder,
        public router: Router,
        private modelService: ModelService,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.modelService.getIsLoading$();
        this.error$ = this.modelService.getError$();
        this.initModelForm();
        this.error$.subscribe(error => {
            if (error) {
                this.snackBar.openFromComponent(SnackBarComponent, {
                    data: {
                        message: error
                    }
                });
            }
        });
    }

    initModelForm() {
        this.modelForm = this.formBuilder.group({
            name: ['', Validators.required],
            brand: [this.data.brand, Validators.required]
        });

        if (this.data.model) {
            this.modelForm.patchValue(this.data.model);
        }
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.modelForm.controls;
    }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.f[controlName].hasError(errorName);
    };

    submit(): void {
        if (this.modelForm.valid) {
            if (this.data.model) {
                this.modelService.setModel(this.modelForm.getRawValue());
            } else {
                this.modelService.addModel(this.modelForm.getRawValue());
            }
            this.isLoading$.subscribe(loading => {
                if (!loading) {
                    this.dialogRef.close(this.modelForm.getRawValue());
                }
            });
        }
    }

}
