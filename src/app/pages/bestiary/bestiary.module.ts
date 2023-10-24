import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBeastComponent } from './create-beast/create-beast.component';
import { BestiaryListComponent } from './bestiary-list/bestiary-list.component';
import {BestiaryRoutingModule} from "./bestiary-routing.module";
import {MatIconModule} from "@angular/material/icon";
import {BestiaryService} from "./bestiary.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InputTextComponent } from './create-beast/form-elements/input-text/input-text.component';
import { InputSelectComponent } from './create-beast/form-elements/input-select/input-select.component';
import { BorderOutlineComponent } from './create-beast/border-outline/border-outline.component';
import {MatSelectModule} from "@angular/material/select";
import { MultiSelectComponent } from './create-beast/form-elements/multi-select/multi-select.component';
import {MatButtonModule} from "@angular/material/button";
import { LabelTextComponent } from './create-beast/form-elements/label-text/label-text.component';
import { InputGreenBtnComponent } from './create-beast/form-elements/input-green-btn/input-green-btn.component';
import { InputNumberComponent } from './create-beast/form-elements/input-number/input-number.component';
import {HttpClientModule} from "@angular/common/http";
import { MultiSelectItemComponent } from './create-beast/form-elements/multi-select/multi-select-item/multi-select-item.component';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {SharedModule} from "../../../shared/shared.module";
import { PropertyModalComponent } from './create-beast/property-modal/property-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { InputFileComponent } from './create-beast/form-elements/input-file/input-file.component';
import { StatblockInputComponent } from './create-beast/form-elements/statblock-input/statblock-input.component';



@NgModule({
  providers: [
    BestiaryService
  ],
  declarations: [
    CreateBeastComponent,
    BestiaryListComponent,
    InputTextComponent,
    InputSelectComponent,
    BorderOutlineComponent,
    MultiSelectComponent,
    LabelTextComponent,
    InputGreenBtnComponent,
    InputNumberComponent,
    MultiSelectItemComponent,
    PropertyModalComponent,
    InputFileComponent,
    StatblockInputComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BestiaryRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class BestiaryModule { }
