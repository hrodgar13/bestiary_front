import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";
import {BestiaryService} from "../../../bestiary.service";
import {AttributeCode} from "../../../../../../shared/static/creature/attributes.code";
import {
  MatData,
  PropertyModalComponent
} from "../../../../../../shared/components/property-modal/property-modal.component";

@Component({
  selector: 'app-input-green-btn',
  templateUrl: './input-green-btn.component.html',
  styleUrls: ['./input-green-btn.component.scss']
})
export class InputGreenBtnComponent extends DestroySubscription{
  @Output() modalClose = new EventEmitter<any>()
  @Input() route: AttributeCode | string = ''
  @Input() title = ''
  @Input() isScalable: boolean = false

  constructor(
    private dialog: MatDialog,
    private bestiaryService: BestiaryService
  ) {
    super()
  }

  openModal() {
    const data: MatData = {
      title: this.title,
      isScalable: this.isScalable,
      initScaling: null,
      attr_cat: this.route
    }

    const dialogRef = this.dialog.open(PropertyModalComponent, {data})

    dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.bestiaryService.getGreedBtn().next(this.route)
    })
  }
}
