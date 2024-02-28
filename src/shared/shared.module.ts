import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SwitchLangComponent } from './components/switch-lang/switch-lang.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatLegacySelectModule} from "@angular/material/legacy-select";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreaturesListComponent} from "./components/creatures-list/creatures-list.component";
import {DangerSeparatorComponent} from "./components/creatures-list/danger-separator/danger-separator.component";
import {TranslocoPipe} from "@ngneat/transloco";
import {RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {CreatureListService} from "./components/creatures-list/creature-list.service";
import {BorderOutlineComponent} from "./components/border-outline/border-outline.component";



@NgModule({
  declarations: [
    LoaderComponent,
    SwitchLangComponent,
    ConfirmDialogComponent,
    CreaturesListComponent,
    DangerSeparatorComponent,
    BorderOutlineComponent
  ],
  exports: [
    BorderOutlineComponent,
    LoaderComponent,
    SwitchLangComponent,
    CreaturesListComponent,
    DangerSeparatorComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatLegacySelectModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoPipe,
    RouterLink,
    MatIconModule,
  ],
  providers: [
      CreatureListService
  ]
})
export class SharedModule { }
