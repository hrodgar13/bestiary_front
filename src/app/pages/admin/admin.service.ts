import { Injectable } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {ApiService} from "../../../shared/services/api.service";

@Injectable()
export class AdminService {

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) { }

  isAdmin() {
    return this.authService.isAdminAuthenticated()
  }

  getFilters() {
    return this.apiService.getFilters()
  }

  deleteFilter(id: number) {
    return this.apiService.deleteFilter(id)
  }

  getRequestList(perPage: number, isAdmin: boolean) {
    return this.apiService.getReqList(perPage, isAdmin)
  }

  deleteMessage(id: number) {
    return this.apiService.deleteMessage(id)
  }

  changeMessageStatus(id: number) {
    return this.apiService.changeReadStatus(id)
  }

  setAsAdmin(id: number) {
    return this.apiService.setAsAdmin(id)
  }
}
