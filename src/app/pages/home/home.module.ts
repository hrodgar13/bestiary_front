import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TierFirstComponent } from './components/tier-first/tier-first.component';
import { TierBestiaryComponent } from './components/tier-bestiary/tier-bestiary.component';
import {TranslocoPipe} from "@ngneat/transloco";
import {HomeRoutingModule} from "./home-routing.module";



@NgModule({
  declarations: [
    HomeComponent,
    TierFirstComponent,
    TierBestiaryComponent
  ],
  imports: [
    CommonModule,
    TranslocoPipe,
    HomeRoutingModule
  ]
})
export class HomeModule { }
