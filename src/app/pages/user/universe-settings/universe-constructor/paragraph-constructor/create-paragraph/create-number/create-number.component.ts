import {Component, EventEmitter, Output} from '@angular/core';
import {NumberMetadataParagraphInterface} from "../../../../../../../../shared/interfaces/universes/universe.interface";

@Component({
  selector: 'app-create-number',
  templateUrl: './create-number.component.html',
  styleUrls: ['./create-number.component.scss']
})
export class CreateNumberComponent {
  metadata: NumberMetadataParagraphInterface = {value: 0};

  @Output() sendData = new EventEmitter<string>

  propagateData() {
    this.sendData.emit(JSON.stringify(this.metadata))
  }
}
