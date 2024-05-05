import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TextRedactorInitData} from "../../interfaces/technical/text-redactor-init-data.interface";
import {TEXT_REDACTOR_REGEX} from "../../static/constants";

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss']
})
export class AddLinkComponent  implements OnInit, OnDestroy {
  editableText!: string;
  editableHTML!: SafeHtml;
  link: string = ''
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
    this.detectStartLink()
    this.updateHTML();
  }

  updateHTML(): void {
    const regex = TEXT_REDACTOR_REGEX;
    const match = this.editableText.match(regex);
    if (match) {
      const styles = match[1].split(' ').reduce((styleString, style) => {
        if (style === 'bold') styleString += 'font-weight: bold; ';
        if (style === 'italic') styleString += 'font-style: italic; ';
        if (style === 'underline') styleString += 'text-decoration: underline; ';
        return styleString;
      }, '');
      let htmlString = ''
      if(match[4]) {
        htmlString = `<a href="${this.link}" style="${styles} color: ${match[2]};">${match[3]}</a>`;
      } else {
        htmlString = `<span style="${styles} color: ${match[2]};">${match[3]}</span>`;
      }
      this.editableHTML = this.sanitizer.bypassSecurityTrustHtml(htmlString);
    } else {
      this.editableHTML = '';
    }
  }

  detectLinkChanges() {
    this.editableText = this.editableText.replace(/(external_link=")[^"]*"/, `$1${this.link}"`);
    this.updateHTML()
  }

  private detectStartLink() {
    const regex = TEXT_REDACTOR_REGEX;
    const match = this.editableText.match(regex);
    if(match && match[4]) {
      this.link = match[4]
    }
  }
}
