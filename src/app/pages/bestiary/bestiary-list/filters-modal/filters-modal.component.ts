import {Component, Inject, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CreatureFilter} from "../bestiary-list.component";
import {CreateTranslationAttribute} from "../../../../../shared/interfaces/creature/create-attribute.interface";

export interface routeValue {
  route: string
  title: CreateTranslationAttribute
  value: {
    id: string
    name: CreateTranslationAttribute
  }
}

@Component({
  selector: 'app-filters-modal',
  templateUrl: './filters-modal.component.html',
  styleUrls: ['./filters-modal.component.scss']
})
export class FiltersModalComponent extends DestroySubscription implements OnInit{
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: CreatureFilter,
  ) {
    super();
  }

  ngOnInit(): void {

  }
}
