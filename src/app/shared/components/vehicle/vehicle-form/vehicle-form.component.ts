import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatPaginator} from '@angular/material';
import {Status, Vehicle} from '@app/store/models/vehicle.model';
import {VehicleService} from '@app/store/features/vehicle/vehicle.service';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {Color} from '@app/store/models/color.model';
import {ColorService} from '@app/store/features/color/color.service';
import {UserListDialogComponent} from '@app/shared/components/user/user-list-dialog/user-list-dialog.component';
import {Role, User} from '@app/store/models/user.model';
import {BrandService} from '@app/store/features/brand/brand.service';
import {Brand} from '@app/store/models/brand.model';
import {ModelService} from '@app/store/features/model/model.service';
import {Model} from '@app/store/models/model.model';
import {CompanyListDialogComponent} from '@app/shared/components/company/company-list-dialog/company-list-dialog.component';
import {Company} from '@app/store/models/company.model';
import * as moment from 'moment';
import CustomValidators from '@app/shared/validators/custom-validators';

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

    @ViewChild(MatPaginator, {static: true}) brandPaginator: MatPaginator;
    @ViewChild(MatPaginator, {static: true}) modelPaginator: MatPaginator;
    @ViewChild(MatPaginator, {static: true}) colorPaginator: MatPaginator;

    public vehicleForm: FormGroup;
    public isLoading$: Observable<boolean>;
    public statuses = [
        {id: Status.OPERATIVE, name: 'Operativo'},
        {id: Status.MAINTENANCE, name: 'Mantenimiento'}
    ];

    public brands$: Observable<Brand[]>;
    public brandsTotal$: Observable<number>;
    public isLoadingBrand$: Observable<boolean>;

    public models$: Observable<Model[]>;
    public modelsTotal$: Observable<number>;
    public isLoadingModel$: Observable<boolean>;

    public colors$: Observable<Color[]>;
    public colorsTotal$: Observable<number>;
    public isLoadingColor$: Observable<boolean>;

    constructor(
        public location: Location,
        private formBuilder: FormBuilder,
        private vehicleService: VehicleService,
        private modelService: ModelService,
        private colorService: ColorService,
        private brandService: BrandService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.vehicleService.getIsLoading$();
        this.initBrandSelect();
        this.initColorSelect();
        this.initVehicleForm();
        this.initModelSelect();
    }

    initBrandSelect() {
        this.brands$ = this.brandService.getBrandsList$();
        this.brandsTotal$ = this.brandService.getBrandsTotal$();
        this.isLoadingBrand$ = this.brandService.getIsLoading$();

        this._loadBrands();
        this.brandPaginator.page.subscribe(() => this._loadBrands());
    }

    initModelSelect() {
        this.models$ = this.modelService.getModelsList$();
        this.modelsTotal$ = this.modelService.getModelsTotal$();
        this.isLoadingModel$ = this.modelService.getIsLoading$();

        this.modelPaginator.page.subscribe(() => this._loadModels(this.vehicleForm.get('brand').value));
    }

    initColorSelect() {
        this.colors$ = this.colorService.getColorsList$();
        this.colorsTotal$ = this.colorService.getColorsTotal$();
        this.isLoadingColor$ = this.colorService.getIsLoading$();

        this._loadColors();
        this.colorPaginator.page.subscribe(() => this._loadColors());
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
            currentOdometer: new FormControl('', Validators.compose([
                Validators.required,
                Validators.min(1),
                Validators.max(499999)
            ])),
            odometerNextRevision: new FormControl('', Validators.compose([
                Validators.required,
                Validators.max(500000)
            ])),
            insuranceExpirationAt: ['', Validators.required],
            rentExpirationAt: [''],
        }, {
            validator: CustomValidators.nextOdometerGreatherThanValidator
        });

        this.vehicleForm.controls['brand'].valueChanges.subscribe((brandId) => {
            this.vehicleForm.get('model').reset();
            if (!isNaN(brandId)) {
                this._loadModels(brandId);
            }
        });

        if (this.vehicle) {
            this.vehicleForm.patchValue(this.vehicle);
            this.vehicleForm.get('brand').setValue(this.vehicle.brand.id);
            this.vehicleForm.get('model').setValue(this.vehicle.model.id);
            this.vehicleForm.get('color').setValue(this.vehicle.color.id);
            this.vehicleForm.get('owner').setValue(this.vehicle.ownerUser ? this.vehicle.ownerUser : this.vehicle.ownerCompany);
        }
    }

    showOwnerUserDialog() {
        const dialogRef = this.dialog.open(UserListDialogComponent, {
            minWidth: '700px',
            data: {
                roles: [Role.OWNER]
            }
        });
        dialogRef.afterClosed().subscribe((result: User) => {
            if (result) {
                this.vehicleForm.get('owner').setValue(result);
            }
        });
    }

    showOwnerCompanyDialog() {
        const dialogRef = this.dialog.open(CompanyListDialogComponent, {
            minWidth: '500px',
            data: {
                title: 'Company.Label.Companies'
            }
        });
        dialogRef.afterClosed().subscribe((result: Company) => {
            if (result) {
                this.vehicleForm.get('owner').setValue(result);
            }
        });
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.vehicleForm.controls;
    }

    /* Get errors */
    handleError(controlName: string, errorName: string) {
        return this.f[controlName].hasError(errorName);
    }

    submit(): void {
        // Stop here if form is invalid
        // if (this.vehicleForm.valid) {
        const {owner, ...vehicle} = this.vehicleForm.getRawValue();
        vehicle.ownerUser = owner.username ? owner.id : null;
        vehicle.ownerCompany = owner.cif ? owner.id : null;
        vehicle.matriculationAt = moment(vehicle.matriculationAt).format('YYYY-MM-DD');
        vehicle.itvExpirationAt = moment(vehicle.itvExpirationAt).format('YYYY-MM-DD');
        vehicle.insuranceExpirationAt = moment(vehicle.insuranceExpirationAt).format('YYYY-MM-DD');
        vehicle.rentExpirationAt = vehicle.rentExpirationAt ? moment(vehicle.rentExpirationAt).format('YYYY-MM-DD') : null;
        if (this.vehicle) {
            vehicle.id = this.vehicle.id;
            this.vehicleService.setVehicle(vehicle);
        } else {
            this.vehicleService.addVehicle(vehicle);
        }
        this.isLoading$.subscribe(loading => {
            if (!loading) {
                this.onSubmit.emit(vehicle);
            }
        });
    }

    getOwnerName() {
        const owner = this.vehicleForm.value.owner;
        let displayName = null;
        if (owner) {
            // Check if owner is a user
            if (owner.username) {
                if (owner.detail) {
                    displayName = owner.detail.name + ' ' + owner.detail.lastName;
                } else {
                    displayName = owner.username;
                }
            } else {
                // In other case the owner is a company
                displayName = `${owner.name} - CIF: ${owner.cif}`;
            }

        }
        return displayName;
    }

    private _loadBrands() {
        this.brandService.loadBrands({
            sort: 'name',
            order: 'DESC',
            page: this.brandPaginator.pageIndex + 1,
            limit: '',
            filter: ''
        });
    }

    private _loadModels(brandId) {
        this.modelService.loadModels({
            brandId,
            sort: 'name',
            order: 'DESC',
            page: this.brandPaginator.pageIndex + 1,
            limit: '',
            filter: ''
        });
    }

    private _loadColors() {
        this.colorService.loadColors({
            sort: 'name',
            order: 'DESC',
            page: this.colorPaginator.pageIndex + 1,
            limit: '',
            filter: ''
        });
    }

}
