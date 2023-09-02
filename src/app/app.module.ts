import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {HeaderModule} from "./header/header.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import { TranslocoRootModule } from './transloco-root.module';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {HomeModule} from "./pages/home/home.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    TranslocoRootModule,
    MatSlideToggleModule,
    RouterModule,
    SharedModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
