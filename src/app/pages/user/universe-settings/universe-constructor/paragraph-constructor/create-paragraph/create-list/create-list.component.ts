import {Component, EventEmitter, Output} from '@angular/core';
import {ListMetadataParagraphInterface} from "../../../../../../../../shared/interfaces/universes/universe.interface";

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent {
  protected readonly String = String;

  @Output() sendData = new EventEmitter<string>

  listObject: ListMetadataParagraphInterface = {
    listItems: [],
    type: 'letter'
  }

  currentInput: string = '';

  addElementToList() {
    const text = this.currentInput

    this.listObject.listItems.push(text)
    this.sendData.emit(JSON.stringify(this.listObject))
  }

  setListStyle(type: 'letter' | 'number' | 'symbol') {
    this.listObject.type = type
    this.sendData.emit(JSON.stringify(this.listObject))
  }

  removeItem(item: string) {
    const idx = this.listObject.listItems.findIndex(elem => elem === item)

    if(idx !== -1) {
      this.listObject.listItems.splice(idx, 1)

      this.sendData.emit(JSON.stringify(this.listObject))
    }
  }
}
