import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MultiSelect} from "../multi-select.component";

@Component({
  selector: 'app-multi-select-item',
  templateUrl: './multi-select-item.component.html',
  styleUrls: ['./multi-select-item.component.scss']
})
export class MultiSelectItemComponent{
  @Input() selectedItem!: MultiSelect
  @Output() deleteItem = new EventEmitter<number>()

  removeElement() {
    this.deleteItem.emit(this.selectedItem.value)
  }
}
