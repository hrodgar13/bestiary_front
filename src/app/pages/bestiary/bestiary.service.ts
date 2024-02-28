import {Injectable} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {BehaviorSubject, Observable} from "rxjs";
import {ApiService} from "../../../shared/services/api.service";
import {FilteredCreatureDataMetaDto, FilteredCreatureList} from "../../../shared/interfaces/filters/creatures.list";
import {OutputCreatureItem} from "../../../shared/interfaces/filters/output-creature-item";
import {CreatureListFilter} from "../../../shared/interfaces/filters/creature-list-filter";

@Injectable()
export class BestiaryService {

  greenBtnChange$ = new BehaviorSubject<string>('')
  filterSubject$ = new BehaviorSubject<any[] | null>(null)

  constructor(
    private readonly apiService: ApiService
  ) {
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
