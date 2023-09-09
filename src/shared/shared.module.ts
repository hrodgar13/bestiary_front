import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SwitchLangComponent } from './components/switch-lang/switch-lang.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatLegacySelectModule} from "@angular/material/legacy-select";



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
    MatSlideToggleModule,
    MatLegacySelectModule,
  ]
})
export class SharedModule { }
