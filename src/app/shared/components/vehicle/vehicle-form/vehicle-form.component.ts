import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Vehicle} from '@app/store/models/vehicle.model';
import {VehicleService} from '@app/store/features/vehicle/vehicle.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
    @Input() title: string;
    @Input() subtitle: string;
    @Input() vehicle: Vehicle;
    @Output() onSubmit = new EventEmitter<Vehicle>();

    vehicleForm: FormGroup;
    loading = false;
    error: '';

    brands = [
        {id: 1, name: 'Hundai'},
        {id: 2, name: 'VolskWagen'},
        {id: 3, name: 'Peugeot'},
        {id: 4, name: 'Chevrolet'},
        {id: 5, name: 'Ford'}
    ];
    models = [
        {id: 1, name: 'Accent'},
        {id: 2, name: 'Sonata'},
        {id: 3, name: 'Escarabajo'},
        {id: 4, name: 'Camaro'},
        {id: 5, name: 'Mustang'}
    ];
    statuses = [
        {id: 1, name: 'Activo'},
        {id: 2, name: 'Reparación'}
    ];
    colors = [
        {id: 1, name: 'Blanco'},
        {id: 2, name: 'Negro'},
        {id: 3, name: 'Rojo'},
        {id: 4, name: 'Verde'},
        {id: 5, name: 'Azul'},
        {id: 6, name: 'Amarillo'}
    ];

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private snackBar: MatSnackBar,
        private vehicleService: VehicleService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.initVehicleForm();
    }

    initVehicleForm() {
        this.vehicleForm = this.formBuilder.group({
            name: ['', Validators.required],
            plateNumber: ['', Validators.required],
            owner: ['', Validators.required],
            brand: ['', Validators.required],
            model: ['', Validators.required],
            status: ['', Validators.required],
            color: ['', Validators.required],
            matriculationAt: ['', Validators.required],
            itvExpirationAt: [''],
            currentOdometer: ['', Validators.required],
            odometerNextRevision: ['', Validators.required],
            insuranceExpirationAt: ['', Validators.required],
            rentExpirationAt: [''],
        });

        if (this.vehicle) {
            this.vehicleForm.patchValue(this.vehicle);
        }
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.vehicleForm.controls;
    }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.f[controlName].hasError(errorName);
    };

    submit(): void {
        // Stop here if form is invalid
        if (this.vehicleForm.valid) {
            this.onSubmit.emit(this.vehicleForm.value);
        }
    }

}
