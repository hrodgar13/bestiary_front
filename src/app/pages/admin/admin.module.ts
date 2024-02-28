import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {AdminService} from "./admin.service";
import { UnfinishedCreaturesListComponent } from './components/creatures-list/unfinished-creatures-list.component';
import { AttributesListComponent } from './components/attributes-list/attributes-list.component';
import { AdminRequestsListComponent } from './components/admin-requests-list/admin-requests-list.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {MatSidenavModule} from "@angular/material/sidenav";


@NgModule({
  declarations: [
    AdminComponent,
    UnfinishedCreaturesListComponent,
    AttributesListComponent,
    AdminRequestsListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
