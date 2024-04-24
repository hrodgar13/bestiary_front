import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-color-redactor-modal',
  templateUrl: './color-redactor-modal.component.html',
  styleUrls: ['./color-redactor-modal.component.scss']
})
export class ColorRedactorModalComponent {
  currentColor: string = '#ffffff'; // Default white
  previewText: string = 'Sample Text';

  constructor(public dialogRef: MatDialogRef<ColorRedactorModalComponent>) {}

  updatePreview(color: string): void {
    this.currentColor = color;
  }

  confirmColor(): void {
    this.dialogRef.close(this.currentColor);
  }

  cancelColor(): void {
    this.dialogRef.close(null); // Send null to signify no change
  }
}
