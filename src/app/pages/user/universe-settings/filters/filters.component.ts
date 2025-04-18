import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {UniverseTagInterface} from "../../../../../shared/interfaces/user/universe-tag.interface";
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent extends DestroySubscription implements OnInit{
  @Input() categories: UniverseTagInterface[] = []

  selectedCategories: UniverseTagInterface[] = []
  searchInput: string = '';

  @Output() changeSearchInput = new EventEmitter<string>()
  @Output() changeCategoriesFilterList = new EventEmitter<UniverseTagInterface[]>()
  currentLanguage: "en" | 'ua' = 'en'

  constructor(
    private readonly localeService: TranslocoService,
  ) {
    super()
  }

  private filterSubject = new Subject<string>();

  ngOnInit() {
    this.detectLanguageChange()
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

  private detectLanguageChange() {
    this.localeService.langChanges$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      const activeLang: 'en' | 'ua' | string = data


      if(activeLang === 'en' ||activeLang === 'ua') {
        this.currentLanguage = activeLang
      }
    })
  }
}
