import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import {MatLegacyButtonModule} from "@angular/material/legacy-button";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TranslocoPipe} from "@ngneat/transloco";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatLegacyButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterLink,
    TranslocoPipe,
    SharedModule,
    RouterLinkActive
  ]
})
export class HeaderModule { }
