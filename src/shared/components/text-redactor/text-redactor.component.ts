import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FontRedactorModalComponent} from "../../modals/font-redactor-modal/font-redactor-modal.component";
import {TextRedactorInitData} from "../../interfaces/technical/text-redactor-init-data.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DestroySubscription} from "../../helpers/destroy-subscribtion";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-text-redactor',
  templateUrl: './text-redactor.component.html',
  styleUrls: ['./text-redactor.component.scss']
})
export class TextRedactorComponent extends DestroySubscription{

  window = window

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {
    super()
  }

  formatText() {
    const selectedText = window.getSelection()?.toString();

    if(!selectedText) {
      return
    }

    if(selectedText.length > 25) {
      this.snack.open('Selected Text longer than 25 symbols', 'ok', {
        duration: 3000,
        verticalPosition: "top"
      })

      return;
    }

    const data: TextRedactorInitData = {
      editingLine: selectedText
    }

    const dialogRef = this.dialog.open(FontRedactorModalComponent, {data})

    dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      console.log(selectedText, data)
    })


  }
}
