import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {AdminService} from "./admin.service";
import { UnfinishedCreaturesListComponent } from './components/creatures-list/unfinished-creatures-list.component';
import { AttributesListComponent } from './components/attributes-list/attributes-list.component';
import { AdminRequestsListComponent } from './components/admin-requests-list/admin-requests-list.component';
import { AdminRoutingModule } from "./admin-routing.module";
import { MatSidenavModule } from "@angular/material/sidenav";
import { TranslocoPipe } from "@ngneat/transloco";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "../../../shared/shared.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import { MessageRequestModalComponent } from './components/admin-requests-list/modals/message-request.modal/message-request.modal.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { AdminRequestBodyComponent } from './components/admin-requests-list/components/admin-request-body/admin-request-body.component';
import { AdminRequestItemComponent } from './components/admin-requests-list/components/admin-request-body/admin-request-item/admin-request-item.component';
import {
  AdminRequestHeaderComponent
} from "./components/admin-requests-list/components/admin-reqest-header/admin-request-header.component";


@NgModule({
  declarations: [
    AdminComponent,
    UnfinishedCreaturesListComponent,
    AttributesListComponent,
    AdminRequestsListComponent,
    MessageRequestModalComponent,
    AdminRequestHeaderComponent,
    AdminRequestBodyComponent,
    AdminRequestItemComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDialogModule,
    MatSidenavModule,
    TranslocoPipe,
    MatIconModule,
    SharedModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    FormsModule,
    MatTooltipModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
