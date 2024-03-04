import {Component, Inject, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../../../shared/helpers/destroy-subscribtion";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RequestI} from "../../../../../../../shared/interfaces/request/request.interface";
import {AdminService} from "../../../../admin.service";
import {takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-message-request.modal',
  templateUrl: './message-request.modal.component.html',
  styleUrls: ['./message-request.modal.component.scss']
})
export class MessageRequestModalComponent extends DestroySubscription implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RequestI,
    public dialogRef: MatDialogRef<MessageRequestModalComponent>,
    private adminService: AdminService,
    private matSnackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  deleteMessage() {
    this.dialogRef.close(true)
  }

  changeReadStatus(id: number) {
    this.adminService.changeMessageStatus(id).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.data.isRead = !this.data.isRead
    }, error => {
      this.matSnackBar.open(error.error.message, 'ok', {
        duration: 3000,
        verticalPosition: "top"
      })
    })
  }
}
