import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ColorRoutingModule} from './color-routing.module';
import {ListColorComponent} from './views/list-color/list-color.component';
import {AddColorComponent} from './views/add-color/add-color.component';
import {EditColorComponent} from './views/edit-color/edit-color.component';
import {SharedModule} from '@app/shared';

@NgModule({
    declarations: [ListColorComponent, AddColorComponent, EditColorComponent],
    imports: [
        CommonModule,
        ColorRoutingModule,
        SharedModule
    ]
})
export class ColorModule {
}
