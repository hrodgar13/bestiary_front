import { Injectable } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class BestiaryService {

  greenBtnChange$ = new BehaviorSubject<string>('')

  constructor(
    private readonly authService: AuthService
  ) { }

  isAdmin() {
    return this.authService.isAdminAuthenticated();
  }
}
