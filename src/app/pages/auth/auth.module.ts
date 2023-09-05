import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import {AuthRoutingModule} from "./auth-routing.module";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
