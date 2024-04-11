import {Injectable} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {BehaviorSubject, Observable} from "rxjs";
import {ApiService} from "../../../shared/services/api.service";

@Injectable()
export class BestiaryService {

  filterSubject$ = new BehaviorSubject<any[] | null>(null)

  constructor(
    private authService: AuthService,
    private readonly apiService: ApiService
  ) {
  }

  getCreatureById(id: number) {
    return this.apiService.getCreatureById(id)
  }


  isAdmin() {
    return this.authService.isAdminAuthenticated()
  }

  getGreedBtn() {
    return this.apiService.greenBtnChange$
  }
}
