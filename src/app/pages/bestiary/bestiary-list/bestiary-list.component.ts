import {Component, OnInit} from '@angular/core';
import {BestiaryService} from "../bestiary.service";
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {CreateTranslationAttribute} from "../../../../shared/interfaces/creature/create-update/create-attribute.interface";
import {MatDialog} from "@angular/material/dialog";
import {FiltersModalComponent} from "./filters-modal/filters-modal.component";
export interface CreatureListItem {
  creatureDangerLvl: number
  creatures: CreatureListBody[]
}

interface CreatureListBody {
  id: number
  creatureName: CreateTranslationAttribute
}

export interface CreatureFilter {
  creatureName?: string
  alignments?: number[]
  type?: number[]
  size?: number[]
  speeds?: number[]
  speedsAllAttributes?: boolean
  vulnerabilities?: number[]
  vulnerabilitiesAllAttributes?: boolean
  resists?: number[]
  resistsAllAttributes?: boolean
  immunities?: number[]
  immunitiesAllAttributes?: boolean
  languages?: number[]
  languagesAllAttributes?: boolean
}

@Component({
  selector: 'app-bestiary-list',
  templateUrl: './bestiary-list.component.html',
  styleUrls: ['./bestiary-list.component.scss']
})
export class BestiaryListComponent extends DestroySubscription implements OnInit{
  isAdminAuthenticated = false;
  searchInput: string = '';
  creaturesList: CreatureListItem[] = [];

  creatureFilter!: CreatureFilter

  private filterSubject = new Subject<string>();
  unfinishedCreatures: CreatureListItem[] = [];

  constructor(
    private readonly bestiaryService: BestiaryService,
    private readonly dialog: MatDialog
  ) {
    super()
  }

  ngOnInit() {
    this.isAdminAuthenticated = this.bestiaryService.isAdmin();
    this.getCreatures()

    this.filterSubject.pipe(debounceTime(1000), takeUntil(this.destroyStream$)).subscribe((value) => {
      this.creatureFilter.creatureName = value.toString()

      this.getCreatures()
    })

    if(this.isAdminAuthenticated) {
      this.getUnfinishedCreatures()
    }
  }

  clearInputFilter() {
    this.searchInput = ''
  }

  getUnfinishedCreatures() {
    this.bestiaryService.getUnfinishedCreatures().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.unfinishedCreatures = data
    })
  }

  getCreatures() {
    this.bestiaryService.getCreatures().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.creaturesList = data
    })
  }

  setCreatureNameFilter() {
    this.filterSubject.next(this.searchInput)
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(FiltersModalComponent, {data: this.creatureFilter})

    dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.creatureFilter = data
      this.getCreatures()
    })
  }
}
