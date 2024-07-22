import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {UserRoutingModule} from "./user-routing.module";
import { ProfileComponent } from './profile/profile.component';
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./user.service";
import { UniverseSettingsComponent } from './universe-settings/universe-settings.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {TranslocoPipe} from "@ngneat/transloco";
import { FiltersComponent } from './universe-settings/filters/filters.component';
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import { UniverseListComponent } from './universe-settings/universe-list/universe-list.component';
import { UniverseComponent } from './universe-settings/universe/universe.component';



@NgModule({
  providers: [
    UserService
  ],
  declarations: [
    UserComponent,
    ProfileComponent,
    UniverseSettingsComponent,
    FiltersComponent,
    UniverseListComponent,
    UniverseComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    TranslocoPipe,
    MatIconModule,
    MatSelectModule,
  ]
})
export class UserModule { }
