import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {AdminService} from "./admin.service";
import { CreaturesListComponent } from './components/creatures-list/creatures-list.component';
import { AttributesListComponent } from './components/attributes-list/attributes-list.component';
import { AdminRequestsListComponent } from './components/admin-requests-list/admin-requests-list.component';
import {AdminRoutingModule} from "./admin-routing.module";


@NgModule({
  declarations: [
    AdminComponent,
    CreaturesListComponent,
    AttributesListComponent,
    AdminRequestsListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
