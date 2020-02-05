import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-delete-confirm-dialog',
    templateUrl: './delete-confirm-dialog.component.html'
})
export class DeleteConfirmDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { message?: string },
    ) {
    }
}
