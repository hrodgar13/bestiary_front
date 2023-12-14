import {Injectable} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {BehaviorSubject, Observable} from "rxjs";
import {CreatureListItem} from "./bestiary-list/bestiary-list.component";
import {ApiService} from "../../../shared/services/api.service";
import {FilterLabel} from "../../../shared/interfaces/filter/creature-filter.interface";

@Injectable()
export class BestiaryService {

    greenBtnChange$ = new BehaviorSubject<string>('')
    filterSubject$ = new BehaviorSubject<FilterLabel[] | null>(null)

    constructor(
        private readonly authService: AuthService,
        private readonly apiService: ApiService
    ) {
    }

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

    getFilters(key: string) {
        return this.apiService.getAttributes(key)
    }

}
