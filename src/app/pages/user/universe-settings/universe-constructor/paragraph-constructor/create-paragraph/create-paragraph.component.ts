import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  METADATA_FIELD_TYPE,
  UniverseStructureParagraphInterface
} from "../../../../../../../shared/interfaces/universes/universe.interface";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-paragraph',
  templateUrl: './create-paragraph.component.html',
  styleUrls: ['./create-paragraph.component.scss']
})
export class CreateParagraphComponent implements OnInit, OnChanges{
  @Input() paragraphPayload: UniverseStructureParagraphInterface = {
    metadata: JSON.parse('{"description": ""}'),
    order: 0,
    title: "",
    type: "text"
  };
  metadataFieldTypes = Object.values(METADATA_FIELD_TYPE);
  title: string = '';
  type:  'text' | 'number' | 'date' | 'image' | 'list' = METADATA_FIELD_TYPE.text;
  metadata: JSON = JSON.parse("{}");

  @Output() sendParagraph = new EventEmitter<UniverseStructureParagraphInterface>

  ngOnInit() {
    this.initializeProperties()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['paragraphPayload'] && !changes['paragraphPayload'].isFirstChange()) {
      this.initializeProperties();
    }
  }

  setMetadata($event: string) {
    this.metadata = JSON.parse($event)
  }

  clearMetadata() {
    this.paragraphPayload.metadata = JSON.parse("{}")
  }

  addParagraph() {
    const payload: UniverseStructureParagraphInterface = {
      type: this.type,
      title: this.title,
      metadata: this.metadata,
      order: this.paragraphPayload.order,
    }

    console.log(payload)

    this.sendParagraph.emit(payload)
  }

  private initializeProperties() {
    this.title = this.paragraphPayload.title;
    this.type = this.paragraphPayload.type;
    this.metadata = this.paragraphPayload.metadata;
  }
}
