import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SwitchLangComponent } from './components/switch-lang/switch-lang.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatLegacySelectModule} from "@angular/material/legacy-select";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BestiaryModule} from "../app/pages/bestiary/bestiary.module";



@NgModule({
  declarations: [
    LoaderComponent,
    SwitchLangComponent,
    ConfirmDialogComponent
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
    FormsModule,
    ReactiveFormsModule,
    BestiaryModule,
  ]
})
export class SharedModule { }
