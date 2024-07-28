import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
export class CreateParagraphComponent implements OnInit{
  paragraphPayload: UniverseStructureParagraphInterface = {
    metadata: JSON.parse('{"description": ""}'),
    order: 0,
    title: "",
    type: "text"
  };
  metadataFieldTypes = Object.values(METADATA_FIELD_TYPE);
  form!: UntypedFormGroup;
  type: METADATA_FIELD_TYPE = METADATA_FIELD_TYPE.text;
  metadata: JSON = JSON.parse("{}");

  @Output() sendParagraph = new EventEmitter<UniverseStructureParagraphInterface>


  constructor(
    private formBuilder: UntypedFormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.paragraphPayload.title],
      type: [this.paragraphPayload.type]
    })
  }

  setMetadata($event: string) {
    this.metadata = JSON.parse($event)
  }

  clearMetadata() {
    this.paragraphPayload.metadata = JSON.parse("{}")
  }

  addParagraph() {
    const payload: UniverseStructureParagraphInterface = {
      type: this.form.get('type')?.value,
      title: this.form.get('name')?.value,
      metadata: this.metadata,
      order: 0,
    }

    console.log(payload)

    this.sendParagraph.emit(payload)
  }
}
