import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TextRedactorInitData} from "../../interfaces/technical/text-redactor-init-data.interface";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

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
    const regex = /{%\s*custom_font_style="([^"]*)"\s*custom_font_color="([^"]*)"\s*value="([^"]*)"\s*%}/;
    const match = this.data.editingLine.match(regex);
    if (match) {
      const styles = match[1].split(' ').reduce((styleString, style) => {
        if (style === 'bold') styleString += 'font-weight: bold; ';
        if (style === 'italic') styleString += 'font-style: italic; ';
        if (style === 'underline') styleString += 'text-decoration: underline; ';
        return styleString;
      }, '');
      const htmlString = `<span style="${styles} color: ${this.currentColor};">${match[3]}</span>`;
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