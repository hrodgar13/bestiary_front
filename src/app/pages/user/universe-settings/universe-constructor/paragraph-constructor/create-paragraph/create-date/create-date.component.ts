import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DateMetadataParagraphInterface} from "../../../../../../../../shared/interfaces/universes/universe.interface";

@Component({
  selector: 'app-create-date',
  templateUrl: './create-date.component.html',
  styleUrls: ['./create-date.component.scss']
})
export class CreateDateComponent {
  @Output() sendData = new EventEmitter<string>

  payload: DateMetadataParagraphInterface = {}

  propagateData() {
    this.sendData.emit(JSON.stringify(this.payload))
  }
}
