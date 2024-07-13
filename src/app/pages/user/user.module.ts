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



@NgModule({
  providers: [
    UserService
  ],
  declarations: [
    UserComponent,
    ProfileComponent,
    UniverseSettingsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    TranslocoPipe,
  ]
})
export class UserModule { }
