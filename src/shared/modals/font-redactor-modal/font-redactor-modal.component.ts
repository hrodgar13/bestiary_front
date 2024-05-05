import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TextRedactorInitData} from "../../interfaces/technical/text-redactor-init-data.interface";
import {DestroySubscription} from "../../helpers/destroy-subscribtion";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {TEXT_REDACTOR_REGEX} from "../../static/constants";
import {TextManagementService} from "../../services/text-management.service";

@Component({
  selector: 'app-font-redactor-modal',
  templateUrl: './font-redactor-modal.component.html',
  styleUrls: ['./font-redactor-modal.component.scss']
})
export class FontRedactorModalComponent implements OnInit, OnDestroy {
  editableText!: string;
  editableHTML!: SafeHtml;

  constructor(
      private textManager: TextManagementService,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: TextRedactorInitData,
    public dialogRef: MatDialogRef<FontRedactorModalComponent>
  ) { }

  ngOnInit(): void {
    this.updateText();
  }

  ngOnDestroy() {
    this.dialogRef.close(this.editableText)
  }

  updateText(): void {
    this.editableText = this.data.editingLine
    this.updateHTML();
  }

  updateHTML(): void {
   this.editableHTML = this.textManager.updateHTML(this.editableText, 1)
  }

  setStyle(value: string): void {
    const regex = TEXT_REDACTOR_REGEX;
    let match = this.editableText.match(regex);
    if (match) {
      let styles = match[1].split(' ').filter(s => s); // Convert style string to array and filter out empty entries
      const color = match[2];
      const textValue = match[3];

      if (styles.includes(value)) {
        styles = styles.filter(s => s !== value); // Remove style if it exists
      } else {
        styles.push(value); // Add style if it doesn't exist
      }

      // Reconstruct the editableText with updated styles
      this.editableText = `{% custom_font_style="${styles.join(' ')}" custom_font_color="${color}" value="${textValue}" external_link="${match[4]}" %}`;
      this.updateHTML(); // Update the display HTML
    }
  }

  isFilterActive(keyWord: string): boolean {
    const regex = TEXT_REDACTOR_REGEX;
    const match = this.editableText.match(regex);
    return match ? match[1].includes(keyWord) : false;
  }

}
