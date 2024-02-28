import { Injectable } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";

@Injectable()
export class AdminService {

  constructor(
    private authService: AuthService
  ) { }

  isAdmin() {
    return this.authService.isAdminAuthenticated()
  }
}
