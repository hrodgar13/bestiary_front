import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
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
  perPage = 30
  creaturesList: FilteredCreatureList[] = [];
  total: number = 0

  creatureFilter: OutputCreatureItem[] = []
  private filterSubject = new Subject<string>();

  unfinishedCreatures: FilteredCreatureListItem[] = [];
  private loading: boolean = false;

  constructor(
    private readonly bestiaryService: BestiaryService,
    private readonly dialog: MatDialog,
    private el: ElementRef
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
    this.bestiaryService.getCreatures([], '', 0, 'FALSE').pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.unfinishedCreatures = data.creatures.flatMap(item => item.creature)
    })
  }

  getCreatures() {
    this.loading = true
    this.bestiaryService.getCreatures(this.creatureFilter, this.searchInput, this.perPage, 'TRUE').pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.creaturesList = data.creatures
      this.total = data.total
      this.loading = false
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

  checkFiltersToClear() {
    return !! this.creatureFilter.length
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: any) {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight === documentHeight && !this.loading) {
      this.perPage += 30
      this.getCreatures()
    }
  }
}
