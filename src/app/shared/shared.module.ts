import {NgModule} from '@angular/core';
import {MenuItems} from './menu-items/menu-items';
import {AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective} from './accordion';
import {SpinnerComponent} from './spinner.component';
import {CommonModule} from '@angular/common';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import {AppMaterialModule} from '../app-material.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    declarations: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        SpinnerComponent,
        DeleteConfirmDialogComponent
    ],
    exports: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        SpinnerComponent
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
