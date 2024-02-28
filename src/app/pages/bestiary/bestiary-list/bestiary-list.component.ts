import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {FiltersModalComponent} from "./filters-modal/filters-modal.component";
import {OutputCreatureItem} from "../../../../shared/interfaces/filters/output-creature-item";
@Component({
  selector: 'app-bestiary-list',
  templateUrl: './bestiary-list.component.html',
  styleUrls: ['./bestiary-list.component.scss']
})
export class BestiaryListComponent extends DestroySubscription implements OnInit{
  isAdminAuthenticated = false;
  searchInput: string = '';

  creatureFilter: OutputCreatureItem[] = []
  private filterSubject = new Subject<string>();
  perPage = 30;
  search: string = '';


  constructor(
    private readonly dialog: MatDialog,
  ) {
    super()
  }

  ngOnInit() {
    this.filterSubject.pipe(debounceTime(1000), takeUntil(this.destroyStream$)).subscribe((value) => {
      this.search = value.toString()
    })
  }

  clearInputFilter() {
    this.searchInput = ''
    this.search = ''
  }

  setCreatureNameFilter() {
    this.filterSubject.next(this.searchInput)
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(FiltersModalComponent, {data: this.creatureFilter})

    dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.creatureFilter = [...data]
    })
  }

  clearFilter(e: any) {
    e.stopPropagation()
    this.creatureFilter = []
    this.perPage = 30
  }

  checkFiltersToClear() {
    return !! this.creatureFilter.length
  }

}
