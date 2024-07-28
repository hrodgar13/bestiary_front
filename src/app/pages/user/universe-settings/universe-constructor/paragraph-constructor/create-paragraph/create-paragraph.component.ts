import {Component, EventEmitter, Output} from '@angular/core';
import {
  METADATA_FIELD_TYPE,
  UniverseStructureParagraphInterface
} from "../../../../../../../shared/interfaces/universes/universe.interface";

@Component({
  selector: 'app-create-paragraph',
  templateUrl: './create-paragraph.component.html',
  styleUrls: ['./create-paragraph.component.scss']
})
export class CreateParagraphComponent {
  paragraphPayload: UniverseStructureParagraphInterface = {
    metadata: JSON.parse('{"description": ""}'),
    order: 0,
    title: "",
    type: "text"
  };
  metadataFieldTypes = Object.values(METADATA_FIELD_TYPE);

  @Output() sendParagraph = new EventEmitter<UniverseStructureParagraphInterface>

  setMetadata($event: string) {
    this.paragraphPayload.metadata = JSON.parse($event)
  }

  clearMetadata() {
    this.paragraphPayload.metadata = JSON.parse("{}")
  }

  addParagraph() {
    this.sendParagraph.emit(this.paragraphPayload)
  }
}
