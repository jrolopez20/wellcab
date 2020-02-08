import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export default class CustomValidators {

    /**
     * Validator function that check if next odometer revision is grather than current odometer
     * @param control
     */
    static nextOdometerGreatherThanValidator(control: AbstractControl) {
        const current = control.get('currentOdometer');
        const next = control.get('odometerNextRevision');

        if (current && next && next.value <= current.value) {
            next.setErrors({greatherThan: true});
        }
    }
}
