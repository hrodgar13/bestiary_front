import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent extends DestroySubscription implements OnInit{
  @Input() categories: string[] = []

  selectedCategories: string[] = []
  searchInput: string = '';

  @Output() changeSearchInput = new EventEmitter<string>()
  @Output() changeCategoriesFilterList = new EventEmitter<string[]>()

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

  setNameFilter() {
    this.filterSubject.next(this.searchInput)
  }

  addCategoryToFilter($event: any) {
    const isPersist = this.selectedCategories.find(item => item === $event)

    console.log(isPersist)

    if(!isPersist) {
      this.selectedCategories.push($event)
      this.changeCategoriesFilterList.emit(this.selectedCategories)
    }
  }

  removeCategoryFromFilter($event: any) {
    const itemIdx = this.selectedCategories.findIndex(item => item === $event)

    if(itemIdx !== -1) {
      this.selectedCategories.splice(itemIdx, 1)
      this.changeCategoriesFilterList.emit(this.selectedCategories)
    }
  }
}
