import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutes} from './dashboard.routing';
import {ChartistModule} from 'ng-chartist';
import {AppMaterialModule} from '../../app-material.module';
import {SharedModule} from '@app/shared';

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
        FlexLayoutModule,
        ChartistModule,
        SharedModule,
        RouterModule.forChild(DashboardRoutes)
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule {
}
