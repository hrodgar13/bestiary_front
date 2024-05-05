import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TextRedactorInitData} from "../../interfaces/technical/text-redactor-init-data.interface";
import {TEXT_REDACTOR_REGEX} from "../../static/constants";
import {TextManagementService} from "../../services/text-management.service";

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
    public dialogRef: MatDialogRef<AddLinkComponent>,
    private textManagement: TextManagementService
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
    this.editableHTML = this.textManagement.updateHTML(this.editableText,4)
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
