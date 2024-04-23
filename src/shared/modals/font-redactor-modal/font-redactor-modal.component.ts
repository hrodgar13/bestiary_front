import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TextRedactorInitData} from "../../interfaces/technical/text-redactor-init-data.interface";
import {DestroySubscription} from "../../helpers/destroy-subscribtion";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-font-redactor-modal',
  templateUrl: './font-redactor-modal.component.html',
  styleUrls: ['./font-redactor-modal.component.scss']
})
export class FontRedactorModalComponent implements OnInit, OnDestroy {
  editableText!: string;
  editableHTML!: SafeHtml;

  constructor(
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
    this.editableText = `{% custom_font_style="${this.data.custom_font_style ? this.data.custom_font_style : ''}" custom_font_color="${this.data.custom_font_color ? this.data.custom_font_color : ''}" value="${this.data.editingLine}" %}`;
    this.updateHTML();
  }

  updateHTML(): void {
    const regex = /{%\s*custom_font_style="([^"]*)"\s*custom_font_color="([^"]*)"\s*value="([^"]*)"\s*%}/;
    const match = this.editableText.match(regex);
    if (match) {
      const styles = match[1].split(' ').reduce((styleString, style) => {
        if (style === 'bold') styleString += 'font-weight: bold; ';
        if (style === 'italic') styleString += 'font-style: italic; ';
        if (style === 'underline') styleString += 'text-decoration: underline; ';
        return styleString;
      }, '');
      const htmlString = `<span style="${styles} color: ${match[2]};">${match[3]}</span>`;
      this.editableHTML = this.sanitizer.bypassSecurityTrustHtml(htmlString);
    } else {
      this.editableHTML = '';
    }
  }

  setStyle(value: string): void {
    if (this.data.custom_font_style?.includes(value)) {
      this.data.custom_font_style = this.data.custom_font_style.replace(value, '').trim();
    } else {
      this.data.custom_font_style += ' ' + value;
    }
    this.updateText();
  }

  isFilterActive(keyWord: string) {
    const regex = /{%\s*custom_font_style="([^"]*)"\s*custom_font_color="([^"]*)"\s*value="([^"]*)"\s*%}/;
    const match = this.editableText.match(regex);

    if (match) {
      return match[1].includes(keyWord)
    }

    return false
  }
}
