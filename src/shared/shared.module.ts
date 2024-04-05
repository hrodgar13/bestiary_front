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
import { CreaturesFilterComponent } from './components/creatures-filter/creatures-filter.component';
import {MatButtonModule} from "@angular/material/button";
import {PropertyModalComponent} from "./components/property-modal/property-modal.component";
import { ContactUsComponent } from './modals/contact-us/contact-us.component';
import {InputTextComponent} from "./components/form-elements/input-text/input-text.component";
import {InputSelectComponent} from "./components/form-elements/input-select/input-select.component";
import {TextAreaInputComponent} from "./components/form-elements/text-area-input/text-area-input.component";
import { PaginatorComponent } from './components/paginator/paginator.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import {MatMenuModule} from "@angular/material/menu";
import { EditActionAbilityComponent } from './modals/edit-action-ability/edit-action-ability.component';



@NgModule({
  declarations: [
    LoaderComponent,
    SwitchLangComponent,
    ConfirmDialogComponent,
    CreaturesListComponent,
    DangerSeparatorComponent,
    BorderOutlineComponent,
    CreaturesFilterComponent,
    PropertyModalComponent,
    InputTextComponent,
    InputSelectComponent,
    ContactUsComponent,
    TextAreaInputComponent,
    PaginatorComponent,
    AuthLoginComponent,
    EditActionAbilityComponent,
  ],
  exports: [
    BorderOutlineComponent,
    LoaderComponent,
    SwitchLangComponent,
    CreaturesListComponent,
    DangerSeparatorComponent,
    CreaturesFilterComponent,
    InputTextComponent,
    InputSelectComponent,
    TextAreaInputComponent,
    PaginatorComponent,
    AuthLoginComponent,
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
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [
      CreatureListService
  ]
})
export class SharedModule { }
