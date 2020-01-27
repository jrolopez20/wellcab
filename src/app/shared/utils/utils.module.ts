import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from '@app/shared/utils/spinner/spinner.component';
import {DeleteConfirmDialogComponent} from '@app/shared/utils/delete-confirm-dialog/delete-confirm-dialog.component';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        SpinnerComponent,
        DeleteConfirmDialogComponent
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
        DeleteConfirmDialogComponent
    ],
    entryComponents: [DeleteConfirmDialogComponent]
})
export class UtilsModule {
}
