import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColorListComponent} from './color-list/color-list.component';
import {ColorFormComponent} from './color-form/color-form.component';
import {FlexModule} from '@angular/flex-layout';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import * as ColorReducer from '@app/store/features/color/color.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ColorEffects} from '@app/store/features/color/color.effects';
import { ColorPickerModule } from 'ngx-color-picker';
import {UtilsModule} from '@app/shared/utils/utils.module';

@NgModule({
    declarations: [ColorListComponent, ColorFormComponent],
    imports: [
        CommonModule,
        FlexModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        ColorPickerModule,
        StoreModule.forFeature(
            ColorReducer.featureKey,
            ColorReducer.reducer
        ),
        EffectsModule.forFeature([ColorEffects]),
        UtilsModule
    ],
    exports: [ColorListComponent, ColorFormComponent]
})
export class ColorModule {
}
