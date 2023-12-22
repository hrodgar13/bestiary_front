import {Injectable} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {BehaviorSubject, Observable} from "rxjs";
import {ApiService} from "../../../shared/services/api.service";
import {FilteredCreatureList} from "../../../shared/interfaces/filters/creatures.list";
import {OutputCreatureItem} from "../../../shared/interfaces/filters/output-creature-item";
import {CreatureListFilter} from "../../../shared/interfaces/filters/creature-list-filter";

@Injectable()
export class BestiaryService {

  greenBtnChange$ = new BehaviorSubject<string>('')
  filterSubject$ = new BehaviorSubject<any[] | null>(null)

  constructor(
    private readonly authService: AuthService,
    private readonly apiService: ApiService
  ) {
  }

  isAdmin() {
    return this.authService.isAdminAuthenticated();
  }

  getCreatures(filter: OutputCreatureItem[], finished?: string): Observable<FilteredCreatureList[]> {

    const refactoredFilters: CreatureListFilter[] = []

    filter.forEach(item => {
      const idx = refactoredFilters.findIndex(itemIdx => itemIdx.filter_cat === item.msr_cat)

      if(idx === -1) {
        refactoredFilters.push({
          filter_cat: item.msr_cat,
          filter_values: [item.attribute]
        })
      } else {
        refactoredFilters[idx].filter_values.push(item.attribute)
      }
    })

    return this.apiService.getCreaturesList(refactoredFilters, finished)
  }

  getCreatureById(id: number) {
    return this.apiService.getCreatureById(id)
  }

  getUnfinishedCreatures() {
    return this.apiService.getUnfinishedCreatures()
  }


  getFilters() {
    return this.apiService.getFilters()
  }
}
