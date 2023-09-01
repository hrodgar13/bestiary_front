import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SwitchLangComponent } from './components/switch-lang/switch-lang.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";



@NgModule({
  declarations: [
    LoaderComponent,
    SwitchLangComponent
  ],
  exports: [
    LoaderComponent,
    SwitchLangComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule
  ]
})
export class SharedModule { }
