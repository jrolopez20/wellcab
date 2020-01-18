import {NgModule} from '@angular/core';
import {MenuItems} from './menu-items/menu-items';
// import {SpinnerComponent} from './components/spinner.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {DeleteConfirmDialogComponent} from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {AppMaterialModule} from '@app/app-material.module';

@NgModule({
    declarations: [
        SpinnerComponent,
        DeleteConfirmDialogComponent
    ],
    exports: [
        SpinnerComponent,
        DeleteConfirmDialogComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        TranslateModule
    ],
    entryComponents: [DeleteConfirmDialogComponent],
    providers: [MenuItems]
})
export class SharedModule {
}
