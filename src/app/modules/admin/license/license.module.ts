import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenseRoutingModule } from './license-routing.module';
import { AddLicenseComponent } from './views/add-license/add-license.component';
import { EditLicenseComponent } from './views/edit-license/edit-license.component';
import { ListLicenseComponent } from './views/list-license/list-license.component';


@NgModule({
  declarations: [AddLicenseComponent, EditLicenseComponent, ListLicenseComponent],
  imports: [
    CommonModule,
    LicenseRoutingModule
  ]
})
export class LicenseModule { }
