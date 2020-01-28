import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BrandRoutingModule} from './brand-routing.module';
import {ListBrandComponent} from './views/list-brand/list-brand.component';
import {SharedModule} from '@app/shared';

@NgModule({
    declarations: [ListBrandComponent],
    imports: [
        CommonModule,
        BrandRoutingModule,
        SharedModule
    ]
})
export class BrandModule {
}
