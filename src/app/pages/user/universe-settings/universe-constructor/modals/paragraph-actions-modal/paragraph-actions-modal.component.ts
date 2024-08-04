import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-paragraph-actions-modal',
  templateUrl: './paragraph-actions-modal.component.html',
  styleUrls: ['./paragraph-actions-modal.component.scss']
})
export class ParagraphActionsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ParagraphActionsModalComponent>,
  ) {}

  outputDecision(action: 'delete' | 'edit' | null) {
    this.dialogRef.close(action)
  }
}
