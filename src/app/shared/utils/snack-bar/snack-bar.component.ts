import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material';

@Component({
    selector: 'app-snack-bar',
    templateUrl: './snack-bar.component.html'
})
export class SnackBarComponent {

    constructor(
        public snackBarRef: MatSnackBarRef<SnackBarComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: any
    ) {
    }

}
