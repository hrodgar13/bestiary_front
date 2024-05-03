import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TextRedactorInitData} from "../../interfaces/technical/text-redactor-init-data.interface";

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss']
})
export class AddLinkComponent  implements OnInit, OnDestroy {
  editableText!: string;
  editableHTML!: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: TextRedactorInitData,
    public dialogRef: MatDialogRef<AddLinkComponent>
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
    // const regex = /{%\s*custom_font_style="([^"]*)"\s*custom_font_color="([^"]*)"\s*value="([^"]*)"\s*%}/;
    // const match = this.editableText.match(regex);
    // if (match) {
    //   const styles = match[1].split(' ').reduce((styleString, style) => {
    //     if (style === 'bold') styleString += 'font-weight: bold; ';
    //     if (style === 'italic') styleString += 'font-style: italic; ';
    //     if (style === 'underline') styleString += 'text-decoration: underline; ';
    //     return styleString;
    //   }, '');
    //   const htmlString = `<span style="${styles} color: ${match[2]};">${match[3]}</span>`;
    //   this.editableHTML = this.sanitizer.bypassSecurityTrustHtml(htmlString);
    // } else {
    //   this.editableHTML = '';
    // }
  }
}
