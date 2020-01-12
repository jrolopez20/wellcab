import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EntryPointComponent} from './components/entry-point/entry-point.component';
import {AppMaterialModule} from '../app-material.module';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
    declarations: [EntryPointComponent],
    imports: [
        CommonModule,
        AppMaterialModule,
        FlexModule,
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class EntrypointModule {
}
