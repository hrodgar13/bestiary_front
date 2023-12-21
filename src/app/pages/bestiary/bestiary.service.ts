import {Injectable} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {BehaviorSubject, Observable} from "rxjs";
import {ApiService} from "../../../shared/services/api.service";
import {FilteredCreatureList} from "../../../shared/interfaces/filters/creatures.list";

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

  getCreatures(filter: any[], finished?: string): Observable<FilteredCreatureList[]> {
    return this.apiService.getCreaturesList(filter, finished)
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
