import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CityCompaniesListComponent} from '@app/shared/components/city/city-company/city-companies-list/city-companies-list.component';
import {FlexModule} from '@angular/flex-layout';
import {AppMaterialModule} from '@app/app-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import * as CityCompanyReducer from '@app/store/features/city-company/city-company.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CityCompanyEffects} from '@app/store/features/city-company/city-company.effects';
import { CityCompanyFormComponent } from './city-company-form/city-company-form.component';
import {CompanyModule} from '@app/shared/components/company/company.module';
import {UtilsModule} from '@app/shared/utils/utils.module';

@NgModule({
  declarations: [CityCompaniesListComponent, CityCompanyFormComponent],
    imports: [
        CommonModule,
        FlexModule,
        AppMaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        StoreModule.forFeature(
            CityCompanyReducer.featureKey,
            CityCompanyReducer.reducer
        ),
        EffectsModule.forFeature([CityCompanyEffects]),
        CompanyModule,
        UtilsModule,
    ],
  exports: [CityCompaniesListComponent],
  entryComponents:[CityCompanyFormComponent]
})
export class CityCompanyModule { }
