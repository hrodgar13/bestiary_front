import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FontRedactorModalComponent} from "../../modals/font-redactor-modal/font-redactor-modal.component";
import {TextRedactorInitData} from "../../interfaces/technical/text-redactor-init-data.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DestroySubscription} from "../../helpers/destroy-subscribtion";
import {takeUntil} from "rxjs";
import {FormControl} from "@angular/forms";
import {TextManagementService} from "../../services/text-management.service";

@Component({
  selector: 'app-text-redactor',
  templateUrl: './text-redactor.component.html',
  styleUrls: ['./text-redactor.component.scss']
})
export class TextRedactorComponent extends DestroySubscription implements AfterViewInit{

  selectedText: string = '';

  window = window

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private textManagementService: TextManagementService
  ) {
    super();
    this.textManagementService.selectedText$.pipe(takeUntil(this.destroyStream$)).subscribe(
      text => this.selectedText = text
    );
  }

  ngAfterViewInit() {
    // console.log(this.assignedFormControl)
  }

  formatText(event: any) {
    event.stopPropagation()

    // if(!this.validateAssignedFormControl(this.selectedText)) {
    //   return;
    // }

    if(!this.selectedText) {
      return
    }

    if(this.selectedText.length > 25) {
      this.snack.open('Selected Text longer than 25 symbols', 'ok', {
        duration: 3000,
        verticalPosition: "top"
      })

      return;
    }

    const data: TextRedactorInitData = {
      editingLine: this.selectedText
    }

    const dialogRef = this.dialog.open(FontRedactorModalComponent, {data})

    dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(modifiedText => {
      if (modifiedText) {
        this.textManagementService.getSelectedRange().subscribe(range => {
          if (range) {
            this.replaceSelectedText(range, modifiedText);
          }
        });
      }
    });
  }

  replaceSelectedText(range: Range, modifiedText: string) {
    range.deleteContents();
    const newNode = document.createElement('span');
    newNode.innerHTML = modifiedText;
    range.insertNode(newNode);

    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }
  // private validateAssignedFormControl(selectedText: string | undefined) {
  //   if(selectedText && this.assignedFormControl.value) {
  //     return !!this.assignedFormControl.value.includes(selectedText)
  //   }
  //
  //   return false
  // }
}
