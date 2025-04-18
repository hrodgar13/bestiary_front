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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MessageRequestModalComponent } from './components/admin-requests-list/modals/message-request.modal/message-request.modal.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { AdminRequestBodyComponent } from './components/admin-requests-list/components/admin-request-body/admin-request-body.component';
import { AdminRequestItemComponent } from './components/admin-requests-list/components/admin-request-body/admin-request-item/admin-request-item.component';
import {
  AdminRequestHeaderComponent
} from "./components/admin-requests-list/components/admin-reqest-header/admin-request-header.component";
import { UniverseTagsListComponent } from './components/universe-tags-list/universe-tags-list.component';
import { AddTagModalComponent } from './components/universe-tags-list/add-tag-modal/add-tag-modal.component';
import {MatLegacyOptionModule} from "@angular/material/legacy-core";
import {MatLegacySelectModule} from "@angular/material/legacy-select";


@NgModule({
  declarations: [
    AdminComponent,
    UnfinishedCreaturesListComponent,
    AttributesListComponent,
    AdminRequestsListComponent,
    MessageRequestModalComponent,
    AdminRequestHeaderComponent,
    AdminRequestBodyComponent,
    AdminRequestItemComponent,
    UniverseTagsListComponent,
    AddTagModalComponent
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
        MatTooltipModule,
        MatLegacyOptionModule,
        MatLegacySelectModule,
        ReactiveFormsModule
    ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
