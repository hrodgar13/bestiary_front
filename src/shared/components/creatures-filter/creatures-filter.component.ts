import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, Subject, takeUntil} from "rxjs";
import {DestroySubscription} from "../../helpers/destroy-subscribtion";
import {FiltersModalComponent} from "../../../app/pages/bestiary/bestiary-list/filters-modal/filters-modal.component";
import {OutputCreatureItem} from "../../interfaces/filters/output-creature-item";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-creatures-filter',
  templateUrl: './creatures-filter.component.html',
  styleUrls: ['./creatures-filter.component.scss']
})
export class CreaturesFilterComponent extends DestroySubscription implements OnInit{

  @Input() perPage = 30;
  creatureFilter: OutputCreatureItem[] = []
  searchInput: string = '';

  @Output() changeSearchInput = new EventEmitter<string>()
  @Output() changeFilter = new EventEmitter<OutputCreatureItem[]>()
  @Output() changePerPage = new EventEmitter<number>()

  constructor(
    private readonly dialog: MatDialog,
  ) {
    super()
  }

  private filterSubject = new Subject<string>();

  ngOnInit() {
    this.filterSubject.pipe(debounceTime(1000), takeUntil(this.destroyStream$)).subscribe((value) => {
      this.changeSearchInput.emit(value.toString())
    })
  }

  clearInputFilter() {
    this.searchInput = ''

    this.changeSearchInput.emit('')
  }

  setCreatureNameFilter() {
    this.filterSubject.next(this.searchInput)
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(FiltersModalComponent, {data: this.creatureFilter})

    dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.creatureFilter = [...data]
      this.changeFilter.emit(this.creatureFilter)
    })
  }

  clearFilter(e: any) {
    e.stopPropagation()
    this.creatureFilter = []
    this.perPage = 30

    this.changeFilter.emit(this.creatureFilter)
    this.changePerPage.emit(this.perPage)
  }

  checkFiltersToClear() {
    return !! this.creatureFilter.length
  }
}
