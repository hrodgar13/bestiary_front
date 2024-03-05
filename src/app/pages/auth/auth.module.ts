import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslocoPipe} from "@ngneat/transloco";
import {LoginService} from "./login.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  providers: [
    LoginService
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    TranslocoPipe
  ]
})
export class AuthModule {
}
