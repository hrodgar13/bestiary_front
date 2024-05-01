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
import {FiltersModalComponent} from "./modals/filters-modal/filters-modal.component";
import { TextRedactorComponent } from './components/text-redactor/text-redactor.component';
import { D20IconComponent } from './static/d20-icon/d20-icon.component';
import { TextRedactorReaderPipe } from './pipes/text-redactor/text-redactor-reader.pipe';
import { FontRedactorModalComponent } from './modals/font-redactor-modal/font-redactor-modal.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import { ColorRedactorModalComponent } from './modals/color-redactor-modal/color-redactor-modal.component';
import {ColorPickerModule} from "ngx-color-picker";
import { CreateDiceRollComponent } from './modals/create-dice-roll/create-dice-roll.component';
import {InputNumberComponent} from "./components/form-elements/input-number/input-number.component";



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
    FiltersModalComponent,
    TextRedactorComponent,
    D20IconComponent,
    TextRedactorReaderPipe,
    FontRedactorModalComponent,
    ColorRedactorModalComponent,
    CreateDiceRollComponent,
    InputNumberComponent
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
        FiltersModalComponent,
        TextRedactorComponent,
        InputNumberComponent,
        TextRedactorReaderPipe
    ],
  imports: [
    ColorPickerModule,
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
    ClipboardModule
  ],
  providers: [
      CreatureListService
  ]
})
export class SharedModule { }
