import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FontRedactorModalComponent} from "../../modals/font-redactor-modal/font-redactor-modal.component";
import {TextRedactorInitData} from "../../interfaces/technical/text-redactor-init-data.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DestroySubscription} from "../../helpers/destroy-subscribtion";
import {takeUntil} from "rxjs";
import { Clipboard } from '@angular/cdk/clipboard';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-text-redactor',
  templateUrl: './text-redactor.component.html',
  styleUrls: ['./text-redactor.component.scss']
})
export class TextRedactorComponent extends DestroySubscription implements OnInit{

  @Input() assignedFormControl!: any

  window = window
  _value: string = '';
  editableText: string = '';

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private clipboard: Clipboard
  ) {
    super()
  }

  ngOnInit() {
    this._value = `{% custom_font_style="" custom_font_color="" value="" %}`;
    this.parseValue();
  }

  parseValue() {
    const regex = /{%\s*custom_font_style="([^"]*)"\s*custom_font_color="([^"]*)"\s*value="([^"]*)"\s*%}/;
    const match = this._value.match(regex);
    if (match && match.length > 3) {
      this.editableText = match[3];  // Only update if the structure is correct
    }
  }

  updateValue() {
    const regex = /{%\s*custom_font_style="([^"]*)"\s*custom_font_color="([^"]*)"\s*value="([^"]*)"\s*%}/;
    const match = this._value.match(regex);
    if (match && match.length > 3) {
      // Ensure we're updating only the value field and keeping the rest intact
      this._value = `{% custom_font_style="${match[1]}" custom_font_color="${match[2]}" value="${this.editableText.replace(/"/g, '&quot;')}" %}`;
    }
  }

  formatText() {
    if(!this._value) {
      return
    }

    const data: TextRedactorInitData = {
      editingLine: this._value
    }

    const dialogRef = this.dialog.open(FontRedactorModalComponent, {data})

    dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this._value = data
    })
  }

  copyToClipboard(value: string) {
    if (!value) {
      this.snack.open('No text to copy.', 'OK', { duration: 3000 });
      return;
    }
    this.clipboard.copy(value);
    this.snack.open('Text copied to clipboard!', 'OK', { duration: 3000 });
  }
}
