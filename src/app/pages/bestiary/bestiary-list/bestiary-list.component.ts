import {Component, OnInit} from '@angular/core';
import {BestiaryService} from "../bestiary.service";
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {FiltersModalComponent} from "./filters-modal/filters-modal.component";
@Component({
  selector: 'app-bestiary-list',
  templateUrl: './bestiary-list.component.html',
  styleUrls: ['./bestiary-list.component.scss']
})
export class BestiaryListComponent extends DestroySubscription implements OnInit{
  isAdminAuthenticated = false;
  searchInput: string = '';
  creaturesList: any[] = []; // TODO CREATURE LIST INTERFACE
  //
  creatureFilter: any[] = [] // TODO CREATURE FILER INTERFACE
  //
  private filterSubject = new Subject<string>();
  unfinishedCreatures: any[] = []; // TODO CREATURE LIST INTERFACE
  //
  constructor(
    private readonly bestiaryService: BestiaryService,
    private readonly dialog: MatDialog
  ) {
    super()
  }

  ngOnInit() {
    this.isAdminAuthenticated = this.bestiaryService.isAdmin();
    // this.getCreatures()
    //
    // this.filterSubject.pipe(debounceTime(1000), takeUntil(this.destroyStream$)).subscribe((value) => {
    //   this.searchInput = value.toString()
    //
    //   this.getCreatures()
    // })
    //
    // if(this.isAdminAuthenticated) {
    //   this.getUnfinishedCreatures()
    // }
  }

  clearInputFilter() {
    this.searchInput = ''
  }
  //
  // getUnfinishedCreatures() {
  //   this.bestiaryService.getUnfinishedCreatures().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
  //     this.unfinishedCreatures = data
  //   })
  // }
  //
  getCreatures() {
    this.bestiaryService.getCreatures(this.creatureFilter).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.creaturesList = data
    })
  }
  //
  setCreatureNameFilter() {
    this.filterSubject.next(this.searchInput)
  }
  //
  openFilterDialog() {
    const dialogRef = this.dialog.open(FiltersModalComponent, {data: this.creatureFilter})

    dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.creatureFilter = data
      this.getCreatures()
    })
  }
  //
  clearFilter(e: any) {
    e.stopPropagation()
    this.creatureFilter = []
    this.getCreatures()
  }
  //
  checkFiltersToClear() {
    return !! this.creatureFilter.flatMap(item => item.ids).length
  }
}
