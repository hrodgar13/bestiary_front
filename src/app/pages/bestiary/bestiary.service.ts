import { Injectable } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {BehaviorSubject, Observable} from "rxjs";
import {CreatureListItem} from "./bestiary-list/bestiary-list.component";
import {ApiService} from "../../../shared/services/api.service";

@Injectable()
export class BestiaryService {

  greenBtnChange$ = new BehaviorSubject<string>('')

  constructor(
    private readonly authService: AuthService,
    private readonly apiService: ApiService
  ) { }

  isAdmin() {
    return this.authService.isAdminAuthenticated();
  }

  getCreatures(): Observable<CreatureListItem[]> {
    return this.apiService.getCreaturesList()
  }

  getCreatureById(id: number) {
    return this.apiService.getCreatureById(id)
  }

  getUnfinishedCreatures() {
    return this.apiService.getUnfinishedCreatures()
  }
}
