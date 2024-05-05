import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TextRedactorInitData} from "../../interfaces/technical/text-redactor-init-data.interface";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {TEXT_REDACTOR_REGEX} from "../../static/constants";

@Component({
  selector: 'app-color-redactor-modal',
  templateUrl: './color-redactor-modal.component.html',
  styleUrls: ['./color-redactor-modal.component.scss']
})
export class ColorRedactorModalComponent implements OnInit{
  currentColor: string = '#ffffff'; // Default white
  editableHTML!: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: TextRedactorInitData,
    public dialogRef: MatDialogRef<ColorRedactorModalComponent>
  ) {}

  ngOnInit() {
    this.extractInitialColor(); // Extract color when initializing
    this.updateHTML();
  }

  extractInitialColor(): void {
    const regex = /custom_font_color="([^"]*)"/;
    const match = this.data.editingLine.match(regex);
    if (match) {
      this.currentColor = match[1];
    }
  }

  updateHTML(): void {
    const regex = TEXT_REDACTOR_REGEX;
    const match = this.data.editingLine.match(regex);
    if (match) {
      const href = match[4]
      const styles = match[1].split(' ').reduce((styleString, style) => {
        if (style === 'bold') styleString += 'font-weight: bold; ';
        if (style === 'italic') styleString += 'font-style: italic; ';
        if (style === 'underline') styleString += 'text-decoration: underline; ';
        return styleString;
      }, '');
      let htmlString = ''
      if(match[4]) {
        htmlString = `<a href="${href}" style="${styles} color: ${this.currentColor};">${match[3]}</a>`;
      } else {
        htmlString = `<span style="${styles} color: ${this.currentColor};">${match[3]}</span>`;
      }
      this.editableHTML = this.sanitizer.bypassSecurityTrustHtml(htmlString);
    }
  }

  updatePreview(color: string): void {
    this.currentColor = color;
    this.updateHTML();
  }

  confirmColor(): void {
    const updatedCode = this.data.editingLine.replace(/(custom_font_color=")[^"]*"/, `$1${this.currentColor}"`);
    this.dialogRef.close(updatedCode);
  }

  cancelColor(): void {
    this.dialogRef.close(null);
  }
}
