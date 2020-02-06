import {AbstractControl} from '@angular/forms';

export default class CredentialValidators {

    /**
     * Validator function that check if password and confirmPassword match
     * @param control
     */
    static passwordMatchValidator(control: AbstractControl) {
        if (control.get('password') && control.get('confirmPassword')) {
            const password: string = control.get('password').value; // Get password from our password form control
            const confirmPassword: string = control.get('confirmPassword').value; // Get password from our confirmPassword form control
            // Compare if the password match
            if (password !== confirmPassword) {
                // If they don't match, set an error in our confirmPassword form control
                control.get('confirmPassword').setErrors({mismatch: true});
            } else {
                control.get('confirmPassword').setErrors(null);
            }
        }
    }
}
