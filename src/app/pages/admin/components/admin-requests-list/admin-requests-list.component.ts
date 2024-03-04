import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {AdminService} from "../../admin.service";
import {takeUntil} from "rxjs";
import {RequestI} from "../../../../../shared/interfaces/request/request.interface";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-requests-list',
  templateUrl: './admin-requests-list.component.html',
  styleUrls: ['./admin-requests-list.component.scss']
})
export class AdminRequestsListComponent extends DestroySubscription implements OnInit{

  requests: RequestI[] = []

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
    this.adminService.getRequestList().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.requests = data.data
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
}
