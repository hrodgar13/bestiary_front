import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatData, PropertyModalComponent} from "../../property-modal/property-modal.component";
import {takeUntil} from "rxjs";
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";

@Component({
  selector: 'app-input-green-btn',
  templateUrl: './input-green-btn.component.html',
  styleUrls: ['./input-green-btn.component.scss']
})
export class InputGreenBtnComponent extends DestroySubscription{
  @Output() modalClose = new EventEmitter<any>()
  @Input() route = ''
  @Input() title = ''

  constructor(
    private dialog: MatDialog
  ) {
    super()
  }

  openModal() {
    const data: MatData = {
      title: this.title,
      route: this.route
    }

    const dialogRef = this.dialog.open(PropertyModalComponent, {data})

    dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.modalClose.emit()
    })
  }
}
