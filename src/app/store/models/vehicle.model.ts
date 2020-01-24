export interface Vehicle {
    id: number;
    name: string;
    plateNumber: string;
    brand: any;
    model: any;
    status: any;
    color: any;
    matriculationAt: string;
    currentOdometer: number;
    odometerNextRevision: number;
    insuranceExpirationAt: string;
    itvExpirationAt?: string;
    removeAt?: string;
    rentExpirationAt?: string;
}
