import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TierFirstComponent } from './components/tier-first/tier-first.component';



@NgModule({
  declarations: [
    HomeComponent,
    TierFirstComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
