import {Component, OnInit} from '@angular/core';
import {BestiaryService} from "../bestiary.service";
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {takeUntil} from "rxjs";
import {CreateTranslationAttribute} from "../../../../shared/interfaces/creature/create-attribute.interface";
export interface CreatureListItem {

  creatureDangerLvl: number
  creatures: CreatureListBody[]
}

interface CreatureListBody {
  id: number
  creatureName: CreateTranslationAttribute
}


@Component({
  selector: 'app-bestiary-list',
  templateUrl: './bestiary-list.component.html',
  styleUrls: ['./bestiary-list.component.scss']
})
export class BestiaryListComponent extends DestroySubscription implements OnInit{
  isAdminAuthenticated = false;
  searchInput: any;
  creaturesList: CreatureListItem[] = [];

  constructor(
    private readonly bestiaryService: BestiaryService
  ) {
    super()
  }

  ngOnInit() {
    this.isAdminAuthenticated = this.bestiaryService.isAdmin();
    this.getCreatures()
  }

  clearInputFilter() {
    this.searchInput = ''
  }

  getCreatures() {
    this.bestiaryService.getCreatures().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.creaturesList = data
    })
  }
}
