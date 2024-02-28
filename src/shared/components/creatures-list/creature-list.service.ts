import { Injectable } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {OutputCreatureItem} from "../../interfaces/filters/output-creature-item";
import {Observable} from "rxjs";
import {FilteredCreatureDataMetaDto} from "../../interfaces/filters/creatures.list";
import {CreatureListFilter} from "../../interfaces/filters/creature-list-filter";
import {ApiService} from "../../services/api.service";

@Injectable()
export class CreatureListService {

  constructor(
      private authService: AuthService,
      private apiService: ApiService
  ) { }

  isAdmin() {
    return this.authService.isAdminAuthenticated();
  }

  getCreatures(filter: OutputCreatureItem[], search: string, perPage: number, finished?: string): Observable<FilteredCreatureDataMetaDto> {

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

    return this.apiService.getCreaturesList(refactoredFilters,search, perPage, finished)
  }
}
