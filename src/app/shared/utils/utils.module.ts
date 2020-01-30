import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from '@app/shared/utils/spinner/spinner.component';
import {DeleteConfirmDialogComponent} from '@app/shared/utils/delete-confirm-dialog/delete-confirm-dialog.component';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {SnackBarComponent} from './snack-bar/snack-bar.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material';
import { SearchBoxComponent } from './search-box/search-box.component';

@NgModule({
    declarations: [
        SpinnerComponent,
        DeleteConfirmDialogComponent,
        SnackBarComponent,
        SearchBoxComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FlexModule,
        RouterModule
    ],
    exports: [
        SpinnerComponent,
        DeleteConfirmDialogComponent,
        SnackBarComponent,
        SearchBoxComponent
    ],
    providers: [
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 8000, horizontalPosition: 'end'}}
    ],
    entryComponents: [DeleteConfirmDialogComponent, SnackBarComponent]
})
export class UtilsModule {
}
