import {NgModule} from '@angular/core';
import {MenuItems} from './menu-items/menu-items';
import {AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective} from './accordion';
import {SpinnerComponent} from './spinner.component';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        SpinnerComponent
    ],
    exports: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        SpinnerComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [MenuItems]
})
export class SharedModule {
}
