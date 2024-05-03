import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FontRedactorModalComponent} from "../../modals/font-redactor-modal/font-redactor-modal.component";
import {TextRedactorInitData} from "../../interfaces/technical/text-redactor-init-data.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DestroySubscription} from "../../helpers/destroy-subscribtion";
import {takeUntil} from "rxjs";
import { Clipboard } from '@angular/cdk/clipboard';
import {FormControl} from "@angular/forms";
import {ColorRedactorModalComponent} from "../../modals/color-redactor-modal/color-redactor-modal.component";
import {CreateDiceRollComponent} from "../../modals/create-dice-roll/create-dice-roll.component";
import {AddLinkComponent} from "../../modals/add-link/add-link.component";

@Component({
  selector: 'app-text-redactor',
  templateUrl: './text-redactor.component.html',
  styleUrls: ['./text-redactor.component.scss']
})
export class TextRedactorComponent extends DestroySubscription implements OnInit{
  inputStyles = {
    color: '#B1A79C',
    'font-weight': 'normal',
    'font-style': 'none',
    'text-decoration': 'none'
  };
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
      this.updateInputStylesFromCode(data);
    })
  }

  openColorPicker() {
    if(!this.editableText) {
      return
    }

    const dialogRef = this.dialog.open(ColorRedactorModalComponent, {
      data: { editingLine: this._value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null) { // null means cancelled
        this.updateColor(result); // Method to update color in the main component
      }
    });
  }

  openDiceGenerator() {
    const dialogRef = this.dialog.open(CreateDiceRollComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.copyToClipboard(result)
    });
  }

  updateColor(newColor: string): void {
    this._value = newColor
    this.updateInputStylesFromCode(this._value)
  }


  copyToClipboard(value: string) {
    if (!value) {
      this.snack.open('No text to copy.', 'OK', { duration: 3000 });
      return;
    }
    this.clipboard.copy(value);
    this.snack.open('Text copied to clipboard!', 'OK', { duration: 3000 });
  }

  private updateInputStylesFromCode(code: string): void {
    const regex = /{%\s*custom_font_style="([^"]*)"\s*custom_font_color="([^"]*)"\s*value="([^"]*)"\s*%}/;
    const match = code.match(regex);
    if (match) {
      const fontStyles = match[1].split(' ');
      const color = match[2];

      // Reset styles
      this.inputStyles = {
        'font-weight': fontStyles.includes('bold') ? 'bold' : 'normal',
        'font-style': fontStyles.includes('italic') ? 'italic' : 'normal',
        'text-decoration': fontStyles.includes('underline') ? 'underline' : 'none',
        'color': color || '#B1A79C' // Default to initial if no color is specified
      };
    }
  }

  addLink() {
    if(!this.editableText) {
      return
    }

    const dialogRef = this.dialog.open(AddLinkComponent, {
      data: { editingLine: this._value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null) {
        this.updateColor(result);
      }
    });
  }
}
