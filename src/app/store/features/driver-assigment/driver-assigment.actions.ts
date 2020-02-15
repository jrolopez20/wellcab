import {createAction, props} from '@ngrx/store';
import {DriverAssigment} from '@app/store/models/driver-assigment.model';
import {User} from '@app/store/models/user.model';

export const loadDriverAssigmentsRequest = createAction(
    '[DriverAssigment] Load Driver Assigments Request',
    props<{ licenseId: number, sort: string, order: string, page: number, limit: number, filter?: string }>()
);

export const loadDriverAssigmentsCompleted = createAction(
    '[DriverAssigment] Load Driver Assigments Completed',
    props<{ driverAssigments: DriverAssigment[], total: number }>()
);

export const driverAssigmentsError = createAction(
    '[DriverAssigment] Error',
    props<{ error: any }>()
);

export const addDriverAssigmentRequest = createAction(
    '[DriverAssigment] Add Driver Assigment Request',
    props<{ licenseId: number, driver: User }>()
);

export const addDriverAssigmentCompleted = createAction(
    '[DriverAssigment] Add Driver Assigment Completed',
    props<{ driverAssigment: DriverAssigment }>()
);

export const setDriverAssigmentRequest = createAction(
    '[DriverAssigment] Set Driver Assigment Request',
    props<{ licenseId: number, driverAssigment: DriverAssigment }>()
);

export const setDriverAssigmentCompleted = createAction(
    '[DriverAssigment] Set Driver Assigment Completed',
    props<{ driverAssigment: DriverAssigment }>()
);

export const unlinkDriverRequest = createAction(
    '[DriverAssigment] Unlink Driver Request',
    props<{ licenseId: number, driverAssigment: DriverAssigment }>()
);

export const unlinkDriverCompleted = createAction(
    '[DriverAssigment] Unlink Driver Completed',
    props<{ driverAssigment: DriverAssigment }>()
);


