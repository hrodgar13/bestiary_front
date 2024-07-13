import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {UserRoutingModule} from "./user-routing.module";
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
