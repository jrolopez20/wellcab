import {Component, OnInit} from '@angular/core';
import {Vehicle} from '@app/store/models/vehicle.model';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleService} from '@app/store/features/vehicle/vehicle.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-edit-vehicle',
    templateUrl: './edit-vehicle.component.html',
    styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {
    vehicleId = null;
    public vehicle: Vehicle;

    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private vehicleService: VehicleService,
        private location: Location
    ) {
        this.vehicleId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.loadVehicleData(this.vehicleId);
    }

    loadVehicleData(id) {
        this.vehicleService.getVehiclesList$().subscribe(vehicles => {
            if (vehicles) {
                this.vehicle = vehicles.find(user => user.id.toString() === id);
                if (!this.vehicle) {
                    this.location.back();
                }
            } else {
                this.location.back();
            }
        });
    }

    handleSubmit() {
        this.location.back();
    }

}
