import { Injectable } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";

@Injectable()
export class BestiaryService {

  constructor(
    private readonly authService: AuthService
  ) { }

  isAdmin() {
    return this.authService.isAdminAuthenticated();
  }
}
