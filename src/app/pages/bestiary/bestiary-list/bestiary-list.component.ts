import {Component, OnInit} from '@angular/core';
import {BestiaryService} from "../bestiary.service";
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {FiltersModalComponent} from "./filters-modal/filters-modal.component";
import {Attribute} from "../../../../shared/interfaces/creature/get/attribute";
import {OutputCreatureItem} from "../../../../shared/interfaces/filters/output-creature-item";
import {FilteredCreatureList, FilteredCreatureListItem} from "../../../../shared/interfaces/filters/creatures.list";
@Component({
  selector: 'app-bestiary-list',
  templateUrl: './bestiary-list.component.html',
  styleUrls: ['./bestiary-list.component.scss']
})
export class BestiaryListComponent extends DestroySubscription implements OnInit{
  isAdminAuthenticated = false;
  searchInput: string = '';
  creaturesList: FilteredCreatureList[] = [];
  //
  creatureFilter: OutputCreatureItem[] = []
  //
  private filterSubject = new Subject<string>();
  unfinishedCreatures: FilteredCreatureListItem[] = [];
  //
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
      this.searchInput = value.toString()

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
    this.bestiaryService.getCreatures([], 'FALSE').pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.unfinishedCreatures = data.flatMap(item => item.creature)
    })
  }
  //
  getCreatures() {
    this.bestiaryService.getCreatures(this.creatureFilter, 'TRUE').pipe(takeUntil(this.destroyStream$)).subscribe(data => {
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

  clearFilter(e: any) {
    e.stopPropagation()
    this.creatureFilter = []
    this.getCreatures()
  }

  // checkFiltersToClear() {
  //   return !! this.creatureFilter.flatMap(item => item.ids).length
  // }
}
