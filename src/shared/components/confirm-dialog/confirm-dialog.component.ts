import {Component, Inject, OnInit} from '@angular/core';
import {DestroySubscription} from "../../helpers/destroy-subscribtion";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent extends DestroySubscription implements OnInit {
  ngOnInit(): void {

  }

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
  ) {
    super();
  }

  outputDecision(decision: boolean) {
    this.dialogRef.close(decision)
  }
}
