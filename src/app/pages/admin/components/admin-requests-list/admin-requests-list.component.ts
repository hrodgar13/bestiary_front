import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {AdminService} from "../../admin.service";
import {takeUntil} from "rxjs";
import {RequestI} from "../../../../../shared/interfaces/request/request.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DEFAULT_PERPAGE} from "../../../../../shared/static/constants";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-file-loader";

@Component({
  selector: 'app-admin-requests-list',
  templateUrl: './admin-requests-list.component.html',
  styleUrls: ['./admin-requests-list.component.scss']
})
export class AdminRequestsListComponent extends DestroySubscription implements OnInit{

  requests: RequestI[] = []
  total: number = 0;
  perPage = DEFAULT_PERPAGE
  isAdminOnly = false
  loading = false;

  constructor(
    private readonly adminService: AdminService,
    private matSnack: MatSnackBar
  ) {
    super();
  }

  ngOnInit() {
    this.getRequestsList()
  }

  getRequestsList() {
    this.loading = true
    this.adminService.getRequestList(this.perPage, this.isAdminOnly).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.requests = data.data
      this.total = data.meta.total

      this.loading = false
    })
  }

  deleteMessage(id: number) {
    this.adminService.deleteMessage(id).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.matSnack.open(data.message, 'ok', {
        verticalPosition: 'top',
        duration: 1000
      })
    })
  }

  increasePag() {
    this.perPage += DEFAULT_PERPAGE

    this.getRequestsList()
  }
}
