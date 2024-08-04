import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {UserRoutingModule} from "./user-routing.module";
import { ProfileComponent } from './profile/profile.component';
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./user.service";
import { UniverseSettingsComponent } from './universe-settings/universe-settings.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {TranslocoPipe} from "@ngneat/transloco";
import { FiltersComponent } from './universe-settings/filters/filters.component';
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import { UniverseListComponent } from './universe-settings/universe-list/universe-list.component';
import { UniverseComponent } from './universe-settings/universe/universe.component';
import { DescriptionStructuralParagraphComponent } from './universe-settings/universe/description-structural-paragraph/description-structural-paragraph.component';
import { UniverseCategoryComponent } from './universe-settings/universe/universe-category/universe-category.component';
import { HeaderConstructorComponent } from './universe-settings/universe-constructor/header-constructor/header-constructor.component';
import { ParagraphConstructorComponent } from './universe-settings/universe-constructor/paragraph-constructor/paragraph-constructor.component';
import { UniverseBodyComponent } from './universe-settings/universe/universe-body/universe-body.component';
import { CreateParagraphComponent } from './universe-settings/universe-constructor/paragraph-constructor/create-paragraph/create-paragraph.component';
import { CreateTextComponent } from './universe-settings/universe-constructor/paragraph-constructor/create-paragraph/create-text/create-text.component';
import { CreateNumberComponent } from './universe-settings/universe-constructor/paragraph-constructor/create-paragraph/create-number/create-number.component';
import { CreateDateComponent } from './universe-settings/universe-constructor/paragraph-constructor/create-paragraph/create-date/create-date.component';
import { CreateImageComponent } from './universe-settings/universe-constructor/paragraph-constructor/create-paragraph/create-image/create-image.component';
import { CreateListComponent } from './universe-settings/universe-constructor/paragraph-constructor/create-paragraph/create-list/create-list.component';
import { ParagraphActionsModalComponent } from './universe-settings/universe-constructor/modals/paragraph-actions-modal/paragraph-actions-modal.component';



@NgModule({
  providers: [
    UserService
  ],
  declarations: [
    UserComponent,
    ProfileComponent,
    UniverseSettingsComponent,
    FiltersComponent,
    UniverseListComponent,
    UniverseComponent,
    DescriptionStructuralParagraphComponent,
    UniverseCategoryComponent,
    HeaderConstructorComponent,
    ParagraphConstructorComponent,
    UniverseBodyComponent,
    CreateParagraphComponent,
    CreateTextComponent,
    CreateNumberComponent,
    CreateDateComponent,
    CreateImageComponent,
    CreateListComponent,
    ParagraphActionsModalComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    TranslocoPipe,
    MatIconModule,
    MatSelectModule,
  ]
})
export class UserModule { }
